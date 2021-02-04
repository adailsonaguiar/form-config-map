import { useState } from "react";
import { Form, Button, Grid, Header, Modal, Select } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import ModalCategory from "./components/ModalCategory";

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
    locations: [
      {
        id: 0,
        point: "Gafisa Invert",
        latlng: [-23.61535612556353, -46.67139123381976],
        distance: "R. Otávio Tarquínio de Sousa, 1222",
      },
    ],
  });

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
  console.log(values);
  const handleSaveToPC = () => {
    const fileData = JSON.stringify(values);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `config.json`;
    link.href = url;
    link.click();
  };

  const [open, setOpen] = useState(false);

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
                onChange={(e) => {
                  const valueSplit = e.target.value.split(",");
                  const latlng = [Number(valueSplit[0]), Number(valueSplit[1])];
                  setValues({
                    ...values,
                    center: { ...values.center, latlng: latlng },
                  });
                }}
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
              {Object.keys(values.categories).map((item) => (
                <li>{values.categories[item].label}</li>
              ))}
            </div>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>

        <ModalCategory
          open={open}
          setOpen={setOpen}
          setCategoryConcat={setCategoryConcat}
        />

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default App;
