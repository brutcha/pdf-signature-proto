import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const signatureTitles = [
  'Podpis klienta',
  'Klient / V zastoupení za Klienta',
  'Oprávněná osoba',
  'Oprávněné osoby',
  'Disponent',
  'Klient',
];

async function pdfHasSignature(file) {
  try {
    const [pdfjsLib, pdfjsWorker] = await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url')
    ]);

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    console.log(`[PDF.js] Processing ${pdf.numPages} pages...`);

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');

      for (const searchString of signatureTitles) {
        if (pageText.includes(searchString)) {
          console.log(`[PDF.js] ✓ Found "${searchString}" on page ${pageNum}`);
          return true;
        }
      }
    }

    console.log('[PDF.js] ✗ No signature strings found');
    return false;

  } catch (error) {
    console.error('[PDF.js] Validation failed:', error);
    return false;
  }
}

const schema = yup.object({
  file: yup
    .mixed()
    .required('You need to provide a file')
    .test('fileType', 'Only PDF files are allowed', (file) =>
      file && file[0].type === 'application/pdf'
    )
    .test('hasSignature', 'The PDF must contain one of the required signature strings', async (file) => {
      if (!file || file.length === 0 || file[0].type !== 'application/pdf') return true;
      try {
        return await pdfHasSignature(file[0]);
      } catch (e) {
        console.error('PDF validation failed:', e);
        return false;
      }
    }),
}).required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log('Form submitted successfully', data);
  };

  return (
    <div className="container">
      <h1>PDF Signature Validator</h1>
      <p>Upload a PDF to check for required signature strings.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input type="file" {...register('file')} accept="application/pdf" />
          {errors.file && <p className="error">{errors.file.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Validating...' : 'Validate PDF'}
        </button>
      </form>

      {isSubmitSuccessful && !isSubmitting && (
        <div className="result">
          <h3 className="success">Valid PDF</h3>
          <p>The document contains at least one required signature string.</p>
        </div>
      )}
    </div>
  );
}

export default App;
