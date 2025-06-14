import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd/lib';
import type { LatLng } from 'use-places-autocomplete';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

interface OnSelectAddressProps {
  address?: string;
  city?: string;
  coordinate?: LatLng;
  country?: string;
  district?: string;
}

interface Props extends AutoCompleteProps {
  debounce?: number;
  onSelectAddress?: (data: OnSelectAddressProps) => void;
}

function GoogleAddressField({
  debounce = 100,
  onChange,
  onSelect,
  onSelectAddress,
  ...props
}: Props) {
  const {
    setValue,
    suggestions: { data, status },
  } = usePlacesAutocomplete({
    callbackName: 'YOUR_CALLBACK_NAME',
    debounce,
  });

  const renderSuggestions = data.map(suggestion => {
    const {
      structured_formatting: {
        main_text: mainText,
        secondary_text: secondaryText,
      },
    } = suggestion;

    return {
      label: (
        <>
          <b>{mainText}</b>
          <div>{secondaryText}</div>
        </>
      ),
      value: `${mainText}, ${secondaryText}`,
    };
  });

  const handleSelect = async (address: string) => {
    const results = await getGeocode({ address });

    if (results) {
      const coordinate = getLatLng(results[0]);
      let country = '';
      let city = '';
      let district = '';
      const address = results[0]?.formatted_address;

      for (const component of results[0].address_components) {
        if (component.types.includes('country')) {
          country = component.long_name;
        }

        if (
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1')
        ) {
          city = component.long_name;
        }

        if (
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_2')
        ) {
          district = component.long_name;
        }
      }

      onSelectAddress?.({
        address,
        city,
        coordinate,
        country,
        district,
      });
    }
  };

  return (
    <AutoComplete<string>
      id="searchPlaces-control"
      onChange={(value, option) => {
        setValue(value);
        onChange?.(value, option);
      }}
      onSelect={(value, option) => {
        handleSelect(value);
        onSelect?.(value, option);
      }}
      options={status === 'OK' ? renderSuggestions : []}
      {...props}
    />
  );
}

export default GoogleAddressField;
