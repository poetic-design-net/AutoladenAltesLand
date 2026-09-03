import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const singletonTypes = new Set(['frontpage', 'siteSettings']);

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
            S.documentTypeListItem('fahrzeug').title('Fahrzeuge'),
            S.divider(),
            S.listItem()
              .title('Website')
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
