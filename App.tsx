import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { Fragment } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(
    'https://nahueltori-bigcorp-api.herokuapp.com/api/v1/employees',
  );
  const [isError, setIsError] = useState(false);
  const [resource, setResource] = React.useState('employees');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResource((event.target as HTMLInputElement).value);
    setData([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axios(url);
        setData(result.data);  
      } catch (error) {
        setIsError(true);
      }
      console.log(data);
    };

    fetchData();
  }, [url]);

  
  return (
    <Fragment>
      <View style={styles.container}>
        <form
          onSubmit={event => {
            setUrl(`https://nahueltori-bigcorp-api.herokuapp.com/api/v1/${resource}${query}`);
            event.preventDefault();
          }}
        >
          <p>Select resource:</p>
          <RadioGroup aria-label="gender" name="gender1" value={resource} onChange={handleChange}>
            <FormControlLabel value="employees" control={<Radio />} label="Employees" />
            <FormControlLabel value="departments" control={<Radio />} label="Departments" />
            <FormControlLabel value="offices" control={<Radio />} label="Offices" />
          </RadioGroup>
          <p>Enter query parameters:</p>
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {isError && <div>Something went wrong ...</div>}

        <ul>
          {data.map(item => (
            <li key={item.id}>
              {(() => {
                switch (resource) {
                  case 'employees':
                    return <p>{item.first + ' ' + item.last + ' - Id: ' + item.id}</p>;
                  case 'departments':
                    return <p>{item.name + ' - Id: ' + item.id}</p>;
                  case 'offices':
                    return <p>{item.city + ', ' + item.address + ' - Id: ' + item.id}</p>;
                  default:
                    return null;
                }
              })()}
            </li>
          ))}

        </ul>

      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
