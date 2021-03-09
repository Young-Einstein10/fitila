import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Space } from "antd";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import CreateAdminModal from "./_partials/CreateAdministrators";
import { useApiContext } from "../../../../context";

const AdministratorScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const { auth: api } = useApiContext();

  useEffect(() => {
    const fetchAdminUsers = async () => {
      setIsLoading(true);
      try {
        const res = await api.getUsers();

        if (res.status === 200) {
          const { data } = res.data;

          const adminUsers = data.filter(
            user => user.role.toLowerCase() === "admin"
          );
          setIsLoading(false);

          setUsers(adminUsers);
        }

        console.log(res.data);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    };
    fetchAdminUsers();
  }, [api]);

  const toggleCreateAdminModal = () => setIsCreateAdminModalOpen(open => !open);

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      align: "center",
      render: (record, key) => {
        return (
          <Space size="middle">
            <Button danger>Disable</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <AdminSectionWrapper className="administrators">
      <PageHeader
        title="Administrators"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              onClick={() => toggleCreateAdminModal()}
              size="large"
              type="primary"
            >
              Add Administrators
            </Button>
          </div>,
        ]}
        style={{
          background: "none",
        }}
      />

      <Main>
        <Row>
          <Col span={24}>
            <Table
              className="table-responsive"
              dataSource={users.map(user => {
                const { first_name, last_name } = user;

                const name = `${first_name} ${last_name}`;

                return {
                  ...user,
                  name,
                };
              })}
              columns={columns}
              loading={isLoading}
            />
          </Col>
        </Row>
      </Main>

      {isCreateAdminModalOpen ? (
        <CreateAdminModal
          visible={isCreateAdminModalOpen}
          closeModal={toggleCreateAdminModal}
        />
      ) : null}
    </AdminSectionWrapper>
  );
};

export default AdministratorScreen;
