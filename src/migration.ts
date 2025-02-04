import icon from './lib/icon';
import IconFolderPlugin from './main';

const migrationMap = [
  {
    oldIconPackPrefix: 'Fa',
    identifier: 'Brands',
    transformation: 'Fab',
  },
  {
    oldIconPackPrefix: 'Fa',
    identifier: 'Line',
    transformation: 'Far',
  },
  {
    oldIconPackPrefix: 'Fa',
    identifier: 'Fill',
    transformation: 'Fas',
  },
];

export const migrateIcons = (plugin: IconFolderPlugin) => {
  const data = { ...plugin.getData() };
  const entries = icon.getAllWithPath(plugin);

  entries.forEach((entry) => {
    if (entry) {
      const { key, value } = entry;

      const migration = migrationMap.find(
        (migration) => value.substring(0, 2) === migration.oldIconPackPrefix && value.includes(migration.identifier),
      );

      if (migration) {
        data[key] =
          migration.transformation +
          value.substring(migration.oldIconPackPrefix.length, value.indexOf(migration.identifier));
      }
    }
  });

  return data;
};
