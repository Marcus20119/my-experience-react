import GoogleAddressField from './GoogleAddressField';
import { ContentTranslationField } from './i18n-fields';
import {
  NationalityOfflineField,
  NationalityOnlineField,
} from './nationality-fields';
import {
  PhoneNumberOfflineField,
  PhoneNumberOnlineField,
} from './phone-number-fields';
import SearchField from './SearchField';
import { UploadFileField } from './upload-fields';

function Field() {
  return null;
}

Field.search = SearchField;
Field.PhoneNumberOnline = PhoneNumberOnlineField;
Field.PhoneNumberOffline = PhoneNumberOfflineField;
Field.NationalityOnline = NationalityOnlineField;
Field.NationalityOffline = NationalityOfflineField;
Field.GoogleAddressField = GoogleAddressField;
Field.UploadFile = UploadFileField;
Field.ContentTranslation = ContentTranslationField;

export { Field };
