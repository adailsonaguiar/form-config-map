import { useState } from "react";
import { Form, Button, Grid, Header, Modal, Select } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import ModalCategory from "./components/ModalCategory";
import ModalLocations from "./components/ModalLocations";

function App() {
  const [values, setValues] = useState({
    center: {
      latlng: [-23.61535612556353, -46.67139123381976],
      limit: 0.04,
      minZoom: 14.3,
      zoom: 17,
    },
    map: {
      backgroundColor: "#f2f0ee",
      tileLayer: "v1/fabioassis/ckkejh4zs1bkj18o90tlxbbcd",
    },
    categories: {},
    locations: [],
  });

  const [locations, setLocations] = useState([]);

  function setFieldValueCenter(event) {
    const { name, value } = event.target;
    setValues({ ...values, center: { ...values.center, [name]: value } });
  }

  function setFieldValueMap(event) {
    const { name, value } = event.target;
    setValues({ ...values, map: { ...values.map, [name]: value } });
  }

  function setCategoriesInValues(category) {
    setValues({ ...values, categories: { ...values.categories, ...category } });
  }

  function setCategoryConcat(category) {
    const searchCategory = values.categories[category.id];
    if (!searchCategory) {
      // setCategories({ ...categories, [category.id]: category });
      setCategoriesInValues({ [category.id]: category });
    }
  }

  function getArrayLatnlng(latlng) {
    const valueSplit = latlng.split(",");
    return [Number(valueSplit[0]), Number(valueSplit[1])];
  }

  function setLocationConcat(location) {
    const locationsCopy = locations;
    location.latlng = getArrayLatnlng(location.latlng);
    locationsCopy.push(location);
    setLocations(locationsCopy);
  }

  const handleSaveToPC = () => {
    const valuesCopy = values;
    values.center.latlng = getArrayLatnlng(values.center.latlng);
    const fileData = JSON.stringify(valuesCopy);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `config.json`;
    link.href = url;
    link.click();
  };

  const [open, setOpen] = useState({
    modalCategory: false,
    modalLocation: false,
  });

  return (
    <div className="container">
      <Form onSubmit={() => handleSaveToPC()}>
        <Grid columns={2} padded="horizontally">
          <Grid.Column>
            <Header as="h2">Centro Mapa</Header>
            <Form.Field>
              <label>LatLng Empreendimento (Center)</label>
              <input
                placeholder="-23.61535612556353, -46.67139123381976"
                name="latlng"
                value={values.center.latlng}
                onChange={setFieldValueCenter}
              />
            </Form.Field>
            <Form.Field>
              <label>Limite de visualização</label>
              <input
                type="number"
                placeholder="0.03"
                name="limit"
                value={values.center.limit}
                onChange={setFieldValueCenter}
              />
            </Form.Field>
            <Form.Field>
              <label>Zoom Min</label>
              <input
                type="number"
                placeholder="14.3"
                name="minZoom"
                value={values.center.minZoom}
                onChange={setFieldValueCenter}
              />
            </Form.Field>
            <Form.Field>
              <label>Zoom</label>
              <input
                type="number"
                placeholder="17"
                name="zoom"
                value={values.center.zoom}
                onChange={setFieldValueCenter}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">Configurações mapa</Header>
            <Form.Field>
              <label>backgroundColor Map</label>
              <input
                placeholder="17"
                name="backgroundColor"
                value={values.map.backgroundColor}
                onChange={setFieldValueMap}
              />
            </Form.Field>
            <Form.Field>
              <label>Tile Layer Style</label>
              <input
                placeholder="user/ckkejh4zs1bkj18o90tlx"
                name="tileLayer"
                value={values.map.tileLayer}
                onChange={setFieldValueMap}
              />
            </Form.Field>
          </Grid.Column>
        </Grid>
        <Grid columns={2} padded="horizontally">
          <Grid.Column>
            {!!Object.keys(values.categories).length && (
              <Header as="h2">Categorias</Header>
            )}
            <div>
              {Object.keys(values.categories).map((item, index) => (
                <li key={index}>{values.categories[item].label}</li>
              ))}
            </div>
          </Grid.Column>
          <Grid.Column>
            {!!values.locations.length && <Header as="h2">Locations</Header>}
            <div>
              {values.locations.map((item, index) => (
                <li key={index}>
                  {item.point} {item.latlng}
                </li>
              ))}
            </div>
          </Grid.Column>
        </Grid>

        <div className="buttons-wrapper">
          <ModalCategory
            open={open.modalCategory}
            setOpen={(state) => setOpen({ ...open, modalCategory: state })}
            setCategoryConcat={setCategoryConcat}
          />
          <ModalLocations
            open={open.modalLocation}
            setOpen={(state) => setOpen({ ...open, modalLocation: state })}
            setLocationConcat={setLocationConcat}
          />

          <Button type="submit" primary>
            Download
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default App;
