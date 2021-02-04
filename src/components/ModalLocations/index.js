import { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

function ModalLocations({ setOpen, setLocationConcat, categories, ...rest }) {
  const categoryFirst = Object.keys(categories)[0];
  const [values, setValues] = useState({ id: categoryFirst });
  console.log(values);

  function handleCategory() {
    setLocationConcat(values);
    setOpen(false);
  }

  function setFieldValue(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function setIdLocation(e) {
    const category = categories[e.target.value];
    setValues({ ...values, id: category.id });
  }

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
