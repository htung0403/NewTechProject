import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';

const imageHandler = function() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const quill = this.quill;
    const range = quill.getSelection(true);

    try {
      const storage = getStorage(app);
      const fileName = `quillImages/${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => console.error('Upload failed:', error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          quill.insertEmbed(range.index, 'image', downloadURL);
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
};

export default imageHandler;