export enum REQUEST_SUCCESS_MESSAGE {
  DOCUMENT_CREATED_SUCCESSFULLY = 'Document created successfully',
  DOCUMENT_UPDATED_SUCCESSFULLY = 'Document updated successfully',
  DOCUMENT_DELETED_SUCCESSFULLY = 'Document deleted successfully',
  DOCUMENT_DATA_FETCHED = 'Document fetched successfully',

  USER_CREATED_SUCCESSFULLY = 'User created successfully',
  USER_LOGGED_IN_SUCCESSFULLY = 'User logged in successfully',
}

export enum REQUEST_FAILURE_MESSAGES {
  DOCUMENT_DELETION_FAILED = 'Unable to delete the document.',
  DOCUMENT_DATA_FETCH_FAILED = 'Unable to fetch the document.',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  UNAUTHORIZED_ACCESS = 'Unauthorized resource access.',
  ERROR_IN_CREATING_NEW_DOCUMENT = 'Error in creating new document.',
  UNABLE_TO_UPDATE_DOCUMENT = 'Unable to update document.',
}
