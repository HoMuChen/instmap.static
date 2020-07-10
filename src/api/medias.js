import data from './data/medias.json';

const PER_PAGE = 20;

const medias = {};

medias.getByLocation = function(id, page=1, perPage=PER_PAGE) {
  const docs = data[id];

  return docs
    ? docs.slice(perPage*(page-1), perPage*page)
    : []
}

export default medias
