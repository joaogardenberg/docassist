import Axios from 'axios';

export function uploadUserPicture(file, id, authenticityToken) {
  const data = new FormData();
  data.append('file', file, file.fileName);
  data.append('id', id);
  data.append('authenticity_token', authenticityToken);

  return Axios.put(
    '/system/users/upload_picture',
    data,
    options()
  );
}

export function uploadPatientPicture(file, id, authenticityToken) {
  const data = new FormData();
  data.append('file', file, file.fileName);
  data.append('id', id);
  data.append('authenticity_token', authenticityToken);

  return Axios.put(
    '/system/patients/upload_picture',
    data,
    options()
  );
}

export function uploadUserBackground(file, id, authenticityToken) {
  const data = new FormData();
  data.append('file', file, file.fileName);
  data.append('id', id);
  data.append('authenticity_token', authenticityToken);

  return Axios.put(
    '/system/users/upload_background',
    data,
    options()
  );
}

function options() {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
}
