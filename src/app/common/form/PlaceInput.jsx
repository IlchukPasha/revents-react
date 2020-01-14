import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, Label, Segment, List } from 'semantic-ui-react';

const PlaceInput = ({
  input: { value, onChange, onBlur },
  width,
  options,
  placeholder,
  onSelect,
  meta: { touched, error }
}) => {
  return (
    <div>
      <PlacesAutocomplete
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        searchOptions={options}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Form.Field error={touched && !!error}>
            <input
              placeholder={placeholder}
              {...getInputProps({ placeholder, onBlur })}
            />
            {touched && error && (
              <Label basic color='red'>
                {error}
              </Label>
            )}
            {suggestions.length > 0 && (
              <Segment>
                {loading && <div>Loading...</div>}
                <List selection>
                  {suggestions.map(suggestion => (
                    <List.Item {...getSuggestionItemProps(suggestion)}>
                      <List.Header>
                        {suggestion.formattedSuggestion.mainText}
                      </List.Header>
                      <List.Description>
                        {suggestion.formattedSuggestion.secondaryText}
                      </List.Description>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            )}
          </Form.Field>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlaceInput;
