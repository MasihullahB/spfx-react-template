import { SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/site-users/web';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/files';
import '@pnp/sp/folders';

// User helpers
export const getUserById = async (sp: SPFI, id: number) => {
  return sp.web.siteUsers.getById(id)();
};

export const getUserByLoginName = async (sp: SPFI, loginName: string) => {
  return sp.web.siteUsers.getByLoginName(loginName)();
};

export const getCurrentUser = async (sp: SPFI) => {
  return sp.web.currentUser();
};

// List helpers
export const addListItem = async (
  sp: SPFI,
  listTitle: string,
  properties: Record<string, unknown>
) => {
  return sp.web.lists.getByTitle(listTitle).items.add(properties);
};

export const getListItems = async (
  sp: SPFI,
  listTitle: string,
  select: string[] = [],
  filter?: string
) => {
  let query = sp.web.lists.getByTitle(listTitle).items;

  if (select.length) {
    query = query.select(...select);
  }

  if (filter) {
    query = query.filter(filter);
  }

  return query();
};

export const updateListItem = async (
  sp: SPFI,
  listTitle: string,
  id: number,
  properties: Record<string, unknown>
) => {
  return sp.web.lists.getByTitle(listTitle).items.getById(id).update(properties);
};

export const deleteListItem = async (
  sp: SPFI,
  listTitle: string,
  id: number
) => {
  return sp.web.lists.getByTitle(listTitle).items.getById(id).delete();
};

// Library helpers
export const uploadFile = async (
  sp: SPFI,
  libraryPath: string,
  fileName: string,
  content: Blob | ArrayBuffer
) => {
  return sp.web
    .getFolderByServerRelativePath(libraryPath)
    .files.add(fileName, content, true);
};

export const getFile = async (
  sp: SPFI,
  libraryPath: string,
  fileName: string
) => {
  return sp.web
    .getFolderByServerRelativePath(libraryPath)
    .files.getByName(fileName)
    .getBlob();
};

export const updateFile = async (
  sp: SPFI,
  libraryPath: string,
  fileName: string,
  content: Blob | ArrayBuffer
) => {
  return sp.web
    .getFolderByServerRelativePath(libraryPath)
    .files.getByName(fileName)
    .setContent(content);
};

export const deleteFile = async (
  sp: SPFI,
  libraryPath: string,
  fileName: string
) => {
  return sp.web
    .getFolderByServerRelativePath(libraryPath)
    .files.getByName(fileName)
    .delete();
};
