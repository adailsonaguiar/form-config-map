import { useState } from "react";
import { Button, Form, Modal, Select } from "semantic-ui-react";

function ModalLocations({ setOpen, setLocationConcat, ...rest }) {
  const [values, setValues] = useState({});
  const [category, setCategory] = useState(1);

  const categories = {
    1: {
      active: true,
      id: 1,
      label: "Restaurantes",
      icon: "gastronomia",
      onMenu: true,
    },
    2: {
      active: true,
      id: 2,
      label: "Padarias",
      icon: "padaria",
      onMenu: true,
    },
    3: {
      active: true,
      id: 3,
      label: "Mercados",
      icon: "mercados",
      onMenu: true,
    },
    4: {
      active: true,
      id: 4,
      label: "Vias principais",
      icon: "viasprincipais",
      onMenu: true,
    },
    5: {
      active: true,
      id: 5,
      label: "Aeroportos",
      icon: "aeroporto",
      onMenu: false,
    },
    6: {
      active: true,
      id: 6,
      label: "metro",
      icon: "metro",
      onMenu: false,
    },
    7: {
      active: true,
      id: 7,
      label: "areaverde",
      icon: "areaverde",
      onMenu: false,
    },
    8: {
      active: true,
      id: 8,
      label: "Escolas",
      icon: "escola",
      onMenu: true,
    },
  };

  function handleCategory() {
    setLocationConcat(values);
  }

  function setFieldValue(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function setIdLocation(e) {
    const category = categories[e.target.value];
    setValues({ ...values, id: category.id });
  }
  console.log(values);

  return (
    <Modal
      {...rest}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button type="button" secondary>
          Add Location
        </Button>
      }
    >
      <Modal.Header>Add Location</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Label</label>
            <input
              placeholder="Empreendimento X"
              name="point"
              value={values.point}
              onChange={setFieldValue}
            />
          </Form.Field>
          <Form.Field>
            <label>LatLng</label>
            <input
              placeholder="-23.61535612556353, -46.67139123381976"
              name="latlng"
              value={values.latlng}
              onChange={setFieldValue}
            />
          </Form.Field>
          <Form.Field>
            <label>Texto Adicional</label>
            <input
              placeholder="500m"
              name="distance"
              value={values.distance}
              onChange={setFieldValue}
            />
          </Form.Field>
          <Form.Field>
            <label>Select the category</label>
            <select onChange={setIdLocation}>
              {Object.keys(categories).map((item, index) => (
                <option key={index} value={item}>
                  {categories[item].label}
                </option>
              ))}
            </select>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleCategory()} primary>
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalLocations;
