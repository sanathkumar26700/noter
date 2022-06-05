import { Response } from "miragejs";

/**
 * All the routes related to tag are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all tags in the db.
 * send GET Request at /api/tags
 * */

export const getAllTagsHandler = function () {
  try {
    return new Response(200, {}, { tags: this.db.tags });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets all tags in the db.
 * send GET Request at /api/user/tag/:tagId
 * */

export const getTagHandler = function (schema, request) {
  const tagId = request.params.tagId;
  try {
    const tag = schema.tags.findBy({ _id: tagId });
    return new Response(200, {}, { tag });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
