import fs from 'fs'
import path from 'path'


const removeMedia = (file) =>
  fs.existsSync(path.join(process.cwd(), "uploads",  file)) 
    ? fs.unlinkSync(path.join(process.cwd(), "uploads",  file))
    : false;

export default removeMedia;
