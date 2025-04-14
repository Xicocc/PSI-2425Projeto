const axios = require('axios');
const NodeCache = require('node-cache');
const postalCache = new NodeCache({ stdTTL: 86400 });

async function getAddressByPostalCode(postalCode) {
  // Validate format
  if (!/^\d{4}-\d{3}$/.test(postalCode)) {
    throw new Error('Invalid Portuguese postal code format');
  }

  // Check cache first
  const cached = postalCache.get(postalCode);
  if (cached) return cached;

  try {
    // Try CTT API first
    const cttResponse = await axios.get(`https://www.cttcodigopostal.pt/api/v1/${process.env.CTT_API_KEY}/${postalCode}`, {
      timeout: 3000
    });

    if (cttResponse.data?.concelho) {
      const address = {
        street: cttResponse.data.rua || '',
        city: cttResponse.data.concelho || cttResponse.data.localidade || ''
      };
      postalCache.set(postalCode, address);
      return address;
    }
  } catch (cttError) {
    console.error('CTT API failed, trying fallback:', cttError.message);
    
    // Fallback to Central de Dados
    try {
      const centralResponse = await axios.get(`https://api.centraldedados.pt/codigos_postais/${postalCode.replace('-', '')}`, {
        timeout: 3000
      });

      if (centralResponse.data) {
        const address = {
          street: centralResponse.data.rua || '',
          city: centralResponse.data.concelho || ''
        };
        postalCache.set(postalCode, address);
        return address;
      }
    } catch (centralError) {
      console.error('Fallback API also failed:', centralError.message);
    }
  }

  return null;
}

module.exports = { getAddressByPostalCode };