import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate } from "../utils/authUtils";
const sign = require("jwt-encode");

/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, email, password}
 * */

export const signupHandler = function (schema, request) {
  const { email, password, ...rest } = JSON.parse(request.requestBody);
  try {
    // check if email already exists
    const foundUser = schema.users.findBy({ email });
    if (foundUser) {
      return new Response(
        422,
        {},
        {
          errors: ["Unprocessable Entity. Email Already Exists."],
        }
      );
    }
    const _id = uuid();
    const newUser = {
      _id,
      email,
      password,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      ...rest,
      notes: [],
      archives: [],
      trash: [],
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign({ _id, email }, process.env.REACT_APP_JWT_SECRET);
    return new Response(201, {}, { createdUser, encodedToken });
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
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = function (schema, request) {
  const { email, password } = JSON.parse(request.requestBody);
  try {
    const foundUser = schema.users.findBy({ email });
    if (!foundUser) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    if (password === foundUser.password) {
      const encodedToken = sign(
        { _id: foundUser._id, email },
        process.env.REACT_APP_JWT_SECRET
      );
      foundUser.password = undefined;
      return new Response(200, {}, { foundUser, encodedToken });
    }
    return new Response(
      401,
      {},
      {
        errors: [
          "The credentials you entered are invalid. Unauthorized access error.",
        ],
      }
    );
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


// import { Response } from "miragejs";
// import { requiresAuth } from "../utils/authUtils";

// /**
//  * All the routes related to Archives are present here.
//  *  These are Privately accessible routes.
//  * */

// /**
//  * This handler handles gets all archived notes in the db.
//  * send GET Request at /api/archives
//  * */

// export const getAllArchivedNotesHandler = function (schema, request) {
//   const user = requiresAuth.call(this, request);
//   if (!user) {
//     return new Response(
//       404,
//       {},
//       {
//         errors: ["The email you entered is not Registered. Not Found error"],
//       }
//     );
//   }
//   return new Response(200, {}, { archives: user.archives });
// };

// /**
//  * This handler handles deletes note from archive.
//  * send DELETE Request at /api/archives/delete/:noteId
//  * */

// export const deleteFromArchivesHandler = function (schema, request) {
//   const user = requiresAuth.call(this, request);
//   if (!user) {
//     return new Response(
//       404,
//       {},
//       {
//         errors: ["The email you entered is not Registered. Not Found error"],
//       }
//     );
//   }
//   const { noteId } = request.params;
//   user.archives = user.archives.filter((note) => note._id !== noteId);
//   this.db.users.update({ _id: user._id }, user);
//   return new Response(200, {}, { archives: user.archives });
// };

// /**
//  * This handler handles restoring the archived notes to user notes.
//  * send POST Request at /api/archives/restore/:noteId
//  * */

// export const restoreFromArchivesHandler = function (schema, request) {
//   const user = requiresAuth.call(this, request);
//   if (!user) {
//     return new Response(
//       404,
//       {},
//       {
//         errors: ["The email you entered is not Registered. Not Found error"],
//       }
//     );
//   }
//   const { noteId } = request.params;
//   const restoredNote = user.archives.filter((note) => note._id === noteId)[0];
//   user.archives = user.archives.filter((note) => note._id !== noteId);
//   user.notes.push({ ...restoredNote });
//   this.db.users.update({ _id: user._id }, user);
//   return new Response(200, {}, { archives: user.archives, notes: user.notes });
// };
