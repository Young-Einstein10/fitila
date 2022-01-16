import React, { useState } from "react";
import { Form, Select } from "antd";
import {
  ISubclassProps,
  ISubEcosystem,
} from "../../../../../../context/Ecosystem/types";
import { useEcosystemContext } from "../../../../../../context";
import { capitalize } from "../../../../../../utils/helpers";

const Option = Select.Option;

const EcosystemField = ({
  handleFitilaSubClassChange,
  handleFitilaSubEcosystemChange,
  handleFitilaEcosystemChange,
}) => {
  const [currEcosystem, setCurrEcosystem] = useState("");
  const [subEcosystemSubClass, setSubEcosystemSubClass] = useState<
    ISubclassProps[]
  >([]);
  const [subSegment, setSubSegment] = useState<ISubEcosystem[]>([]);
  const [currSubClass, setCurrSubClass] = useState<ISubclassProps>(null);

  const { data: ecosystem } = useEcosystemContext();

  const updateSubSegment = value => {
    setCurrEcosystem(value);
    const selectedEcosystem = ecosystem.find(eco => eco.name === value);

    console.log(value, selectedEcosystem);

    if (selectedEcosystem) {
      const { id, name } = selectedEcosystem;

      setSubSegment(selectedEcosystem.sub_ecosystem);
      handleFitilaEcosystemChange(id, capitalize(name));
    }
  };

  const handleSubEcosystemChange = value => {
    const selectedSubEcosystem = subSegment.find(
      subSegment => subSegment.name === value
    );

    console.log(value, selectedSubEcosystem);

    if (selectedSubEcosystem) {
      const { id, name } = selectedSubEcosystem;

      setSubEcosystemSubClass(selectedSubEcosystem.sub_class);
      handleFitilaSubEcosystemChange(id, capitalize(name));
    }
  };

  const handleSubClassChange = value => {
    const selectedSubClass = subEcosystemSubClass.find(
      subclass => subclass.name.toLowerCase() === value
    );

    console.log(value, selectedSubClass);

    if (selectedSubClass) {
      const { id, name } = selectedSubClass;

      setCurrSubClass(selectedSubClass);
      handleFitilaSubClassChange(id, capitalize(name));
    }
  };

  return (
    <>
      <Form.Item
        label="Ecosystem"
        name="ecosystem"
        rules={[
          {
            message: "Please select an ecosystem segment!",
            required: true,
          },
        ]}
      >
        <Select
          onChange={e => updateSubSegment(e)}
          placeholder="Ecosystem Segment"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
        >
          {ecosystem.map((eco, key) => (
            <Option key={eco.id} value={eco.name}>
              {eco.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* SUB-ECOSYTEM SEGMENT */}
      {subSegment.length > 0 ? (
        <Form.Item
          label="Sub-Ecosystem"
          name="sub_ecosystem"
          rules={[
            {
              message: "Please select an ecosystem sub-segment!",
              required: true,
            },
          ]}
        >
          <Select
            onChange={e => handleSubEcosystemChange(e)}
            placeholder="Sub-Segment"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            {subSegment.map(segment => (
              <Option key={segment.id} value={segment.name}>
                {segment.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}
      {/* SUB-ECOSYTEM SEGMENT */}

      {/* SUB-CLASS */}
      {subEcosystemSubClass.length > 0 ? (
        <Form.Item
          label="Ecosystem SubClass"
          name="sub_ecosystem_sub_class"
          rules={[
            {
              message: "Please select a sub-segment class!",
              required: true,
            },
          ]}
        >
          <Select
            onChange={e => handleSubClassChange(e)}
            placeholder="Sub-Class"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            {subEcosystemSubClass.map((subClass, key) => (
              <Option key={key} value={subClass.name.toLowerCase()}>
                {subClass.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}
      {/* SUB-CLASS */}
    </>
  );
};

export default EcosystemField;
