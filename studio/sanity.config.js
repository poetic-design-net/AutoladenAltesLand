import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const singletonTypes = new Set(['frontpage', 'aboutPage', 'siteSettings']);

export default defineConfig({
  name: 'default',
  title: 'Autoladen Altes Land',

  projectId: 'dgeh1xh8',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem()
              .title('Startseite')
              .schemaType('frontpage')
              .child(S.document().schemaType('frontpage').documentId('frontpage')),
            S.listItem()
              .title('Über mich')
              .schemaType('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.documentTypeListItem('fahrzeug').title('Fahrzeuge'),
            S.divider(),
            S.listItem()
              .title('Website, Kontakt & Rechtliches')
              .schemaType('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => !['delete', 'duplicate'].includes(action))
        : actions,
  },
});
