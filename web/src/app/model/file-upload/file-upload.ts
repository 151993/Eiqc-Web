export class FileUpload {
  file: File;
  progress = 0;
  status = false;
  isValid = false;
  id = '';
  name = '';
  filePath = '';
  maxFileSize = 0;
  fileSize = 0;
  isWithinSizeLimit = false;
  canDelete = true;

  constructor(file?: File, isValid?: boolean, isWithinSizeLimit?: boolean) {
    this.file = file;
    this.isValid = isValid;
    this.isWithinSizeLimit = isWithinSizeLimit;
  }
}
