import Axios from 'axios';

export function uploadPatientPicture(file, id, authenticityToken) {
  const invalid = invalidPicture(file);

  if (invalid) {
    return invalid;
  }

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

export function uploadUserPicture(file, id, authenticityToken) {
  const invalid = invalidPicture(file);

  if (invalid) {
    return invalid;
  }

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

export function uploadUserBackground(file, id, authenticityToken) {
  const invalid = invalidBackground(file);

  if (invalid) {
    return invalid;
  }

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

function invalidPicture(file) {
  if (!file) {
    return new Promise(resolve => resolve({
      status: 200,
      data: {
        success: false,
        errors: {
          picture: I18n.t('errors.messages.invalid_image')
        }
      }
    }));
  }

  if (file.size > 5242880) {
    return new Promise(resolve => resolve({
      status: 200,
      data: {
        success: false,
        errors: {
          picture: I18n.t('errors.messages.bigger_than_image', { size: '5MB' })
        }
      }
    }));
  }

  if (!['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)) {
    return new Promise(resolve => resolve({
      status: 200,
      data: {
        success: false,
        errors: {
          picture: I18n.t('errors.messages.not_an_image')
        }
      }
    }));
  }

  return null;
}

function invalidBackground(file) {
  if (!file) {
    return new Promise(resolve => resolve({
      status: 200,
      data: {
        success: false,
        errors: {
          background: I18n.t('errors.messages.invalid_image')
        }
      }
    }));
  }

  if (file.size > 5242880) {
    return new Promise(resolve => resolve({
      status: 200,
      data: {
        success: false,
        errors: {
          background: I18n.t('errors.messages.bigger_than_image', { size: '5MB' })
        }
      }
    }));
  }

  if (!['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)) {
    return new Promise(resolve => resolve({
      status: 200,
      data: {
        success: false,
        errors: {
          background: I18n.t('errors.messages.not_an_image')
        }
      }
    }));
  }

  return null;
}
