import { localize } from "vee-validate";
import es from "vee-validate/dist/locale/es.json";
import en from "vee-validate/dist/locale/en.json";
import EnMs from "./locales/en.json";
import EsMs from "./locales/es.json";
localize({
  en: 
  {
    messages: en.messages,
    names:EnMs.validate.names,
    fields: EnMs.validate.fields
  },
  es:
  {
    messages: es.messages,
    names:EsMs.validate.names,
    fields: EsMs.validate.fields,
    messages:EsMs.validate.messagers    
  }
});
localize('es')