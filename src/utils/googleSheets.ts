// Google Sheets Integration Utility
// This file handles the connection to Google Sheets via Google Apps Script

export interface LeadSubmission {
  nombre: string;
  empresa: string;
  celular: string;
  email: string;
  timestamp?: string;
  source?: string;
  leadType?: string;
  campaign?: string;
  pageUrl?: string;
  ctaLocation?: string;
  leadQuality?: string;
  expectedAction?: string;
}

// Get Google Apps Script URL from environment variables
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

/**
 * Submits lead data to Google Sheets via Google Apps Script
 * @param leadData - The lead information to submit
 * @returns Promise<boolean> - Success status
 */
export const submitToGoogleSheets = async (leadData: LeadSubmission): Promise<boolean> => {

  
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    console.error('❌ ERROR: Google Script URL no está configurada en el archivo .env');
    console.error('Por favor configura VITE_GOOGLE_SCRIPT_URL en tu archivo .env');
    alert('Error de configuración: La URL de Google Script no está configurada. Por favor contacta al administrador.');
    return false;
  }

  try {
    const dataToSubmit = {
      ...leadData,
      timestamp: new Date().toISOString(),
      source: leadData.source || 'Website Lead Form',
      leadType: leadData.leadType || 'GENERAL',
      campaign: leadData.campaign || 'General_Contact',
      pageUrl: leadData.pageUrl || window.location.href,
      ctaLocation: leadData.ctaLocation || 'Unknown',
      leadQuality: leadData.leadQuality || 'MEDIUM',
      expectedAction: leadData.expectedAction || 'CONTACT',
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      fecha: new Date().toLocaleString('es-ES', {
        timeZone: 'America/Argentina/Buenos_Aires'
      }),
      origen: window.location.href
    };

    

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit)
    });

    // Note: With no-cors mode, we can't read the response
    // We assume success if no error was thrown
    return true;
  } catch {
    
    // Mostrar error más específico al usuario
    alert('Error al enviar el formulario. Por favor verifica tu conexión a internet e intenta nuevamente.');
    return false;
  }
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns boolean - Is valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (basic validation)
 * @param phone - Phone number to validate
 * @returns boolean - Is valid phone
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[0-9\s-()]{8,}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitizes input data to prevent XSS
 * @param input - String to sanitize
 * @returns string - Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>"'&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    });
};

/*
Google Apps Script Code for Google Sheets Integration:

Create a new Google Apps Script project and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet (make sure to create one and get its ID)
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    const rowData = [
      new Date(data.timestamp),
      data.nombre,
      data.empresa,
      data.celular,
      data.email,
      data.source,
      data.leadType,
      data.campaign,
      data.ctaLocation,
      data.pageUrl,
      data.leadQuality,
      data.expectedAction,
      data.userAgent,
      data.referrer
    ];
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Nombre',
        'Empresa',
        'Celular',
        'Email',
        'Source',
        'Lead Type',
        'Campaign',
        'CTA Location',
        'Page URL',
        'Lead Quality',
        'Expected Action',
        'User Agent',
        'Referrer'
      ]);
    }
    
    // Append the data
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ message: 'Lead capture endpoint is working' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Setup Instructions:
1. Create a new Google Sheets document
2. Copy the spreadsheet ID from the URL
3. Create a new Google Apps Script project
4. Paste the above code
5. Replace 'YOUR_SPREADSHEET_ID' with your actual spreadsheet ID
6. Deploy as a web app with execute permissions for 'Anyone'
7. Copy the web app URL and update VITE_GOOGLE_SCRIPT_URL in your .env file
*/