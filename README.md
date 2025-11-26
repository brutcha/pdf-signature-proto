# PDF Signature Validation Prototype

A React-based web application prototype for validating PDF documents containing signature fields. This tool allows users to upload PDF files and checks whether they contain specific signature-related text strings commonly used in Czech legal documents.

## Features

- **PDF Upload & Validation**: Drag-and-drop or click to upload PDF files
- **Signature String Detection**: Searches PDF text content for specific Czech signature field labels:
  - "Podpis klienta"
  - "Klient / V zastoupení za Klienta"
  - "Oprávněná osoba"
  - "Oprávněné osoby"
  - "Disponent"
  - "Klient"
- **Form Validation**: Built with React Hook Form and Yup for robust form validation
- **Client-Side Processing**: PDF validation happens entirely in the browser using PDF.js

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Form Management**: React Hook Form 7.66.1
- **Validation Schema**: Yup 1.7.1
- **PDF Processing**: PDF.js (pdfjs-dist 5.4.394)

## Prerequisites

- Node.js (v22.21.1 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/brutcha/pdf-signature-proto.git
cd pdf-signature-proto
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## How It Works

1. **Upload**: Users upload a PDF file through the web interface
2. **Validation**: The application validates the file using React Hook Form and Yup
3. **Text Extraction**: PDF.js extracts text content from each page of the document
4. **String Search**: The application searches for specific Czech signature field labels in the extracted text
5. **Results**: The application displays whether the PDF contains any of the required signature strings

## Project Structure

```
pdf-signature-proto/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.