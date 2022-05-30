import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
  userProfilehandler,
} from "./backend/controllers/AuthController";
import {
  getAllTagsHandler,
  getTagHandler,
} from "./backend/controllers/TagsController";
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  trashNoteHandler,
  updateNoteHandler,
  notePinHandler
} from "./backend/controllers/NotesController";
import {
  deleteFromTrashHandler,
  getAllTrashNotesHandler,
  restoreFromTrashHandler,
} from "./backend/controllers/TrashController";
import { users } from "./backend/db/users";
import { tags } from "./backend/db/tags"

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      notes: Model,
      tags: Model
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [],
          archives: [],
          trash: [],
        })
      );

      tags.forEach((item) => server.create("tag", { ...item }));

    },

    routes() {
      this.namespace = "api";

      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // user route (private)
      this.get("/user", userProfilehandler.bind(this));

      // tags routes
      this.get("/tags", getAllTagsHandler.bind(this));
      this.get("/tags/:tagId", getTagHandler.bind(this));

      // notes routes (private)
      this.get("/notes", getAllNotesHandler.bind(this));
      this.post("/notes", createNoteHandler.bind(this));
      this.post("/notes/:noteId", updateNoteHandler.bind(this));
      this.delete("/notes/:noteId", deleteNoteHandler.bind(this));
      this.post("/notes/archives/:noteId", archiveNoteHandler.bind(this));
      this.post("/notes/trash/:noteId", trashNoteHandler.bind(this));
      this.post("/notes/pin/:noteId", notePinHandler.bind(this));

      // archive routes (private)
      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post(
        "/archives/restore/:noteId",
        restoreFromArchivesHandler.bind(this)
      );
      this.delete(
        "/archives/delete/:noteId",
        deleteFromArchivesHandler.bind(this)
      );
      // trash routes (private)
      this.get("/trash", getAllTrashNotesHandler.bind(this));
      this.post("/trash/restore/:noteId", restoreFromTrashHandler.bind(this));
      this.delete("/trash/delete/:noteId", deleteFromTrashHandler.bind(this));
    },
  });
  return server;
}
