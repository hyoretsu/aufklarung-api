/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
 export interface Request {
  /** Multer library file object */
  file: {
   /** A Buffer of the entire file. */
   buffer: string;
   /** The folder to which the file has been saved. */
   destination: string;
   /** Encoding type of the file. */
   encoding: string;
   /** Field name specified in the form. */
   fieldname: string;
   /** Name of the uploaded file. */
   filename: string;
   /** MIME type of the file. */
   mimetype: string;
   /** Name of the file on the user's computer. */
   originalname: string;
   /** The full path to the uploaded file. */
   path: string;
   /** Size of the file in bytes. */
   size: number;
  };
 }
}
