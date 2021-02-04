import { useState } from "react";
import { Button, Form, Modal, Select } from "semantic-ui-react";

// import { Container } from './styles';

function ModalCategory({ setOpen, setCategoryConcat, ...rest }) {
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
    setCategoryConcat(categories[category]);
  }

  return (
    <Modal
      {...rest}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button type="button">Add Category</Button>}
    >
      <Modal.Header>Add Category</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Select category</label>
            <select
              placeholder="Select the Icon"
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.keys(categories).map((item, index) => (
                <option value={item}>{categories[item].label}</option>
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

export default ModalCategory;
