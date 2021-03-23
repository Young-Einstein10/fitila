import React, { useEffect, useState } from "react";
import { Modal, Button, Col, Row, Space, Table } from "antd";
import Axios from "axios";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { useApiContext, useAuthContext } from "../../../../context";
import { IOrganizationProps } from "../../../../context/Organization/types";
import { useMountedState } from "../../../../utils/hooks";
import numberWithCommas from "../../../../utils/numberFormatter";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { ImgPlaceholderStyled } from "../helpers";

interface IPendingAppProps {
  isLoading: boolean;
  data: IOrganizationProps[];
}

const PendingApplications = () => {
  const [organizations, setOrganizations] = useState<IPendingAppProps>({
    isLoading: false,
    data: [],
  });
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);

  const { organization: api } = useApiContext();
  const { auth } = useAuthContext();

  const isMounted = useMountedState();

  useEffect(() => {
    const cancelTokenSource = Axios.CancelToken;
    const source = cancelTokenSource.source();

    const getAllPendingApplications = async () => {
      setOrganizations(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: true,
      }));

      try {
        const res = await api.getPendingOrganization({
          cancelToken: source.token,
        });

        const { data } = res.data;

        if (isMounted()) {
          setOrganizations(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
            data,
          }));
        }
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        }
        // handle error
        if (isMounted()) {
          setOrganizations(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
          }));

          console.log(error);
        }
      }
    };

    getAllPendingApplications();

    return () => {
      // cancel the request (the message parameter is optional)
      source.cancel("Operation canceled by the user.");
    };
  }, [isMounted, api]);

  const refetchPendingApplications = async () => {
    setOrganizations(prevOrganizations => ({
      ...prevOrganizations,
      isLoading: true,
    }));

    try {
      const res = await api.getPendingOrganization();

      const { data } = res.data;

      if (isMounted()) {
        setOrganizations(prevOrganizations => ({
          ...prevOrganizations,
          isLoading: false,
          data,
        }));
      }
    } catch (error) {
      if (Axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      }
      // handle error
      if (isMounted()) {
        setOrganizations(prevOrganizations => ({
          ...prevOrganizations,
          isLoading: false,
        }));

        console.log(error);
      }
    }
  };

  const columns: any = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      // responsive: ["xs"],
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      // responsive: ["xs"],
    },
    {
      title: "Ceo/Founder",
      dataIndex: "ceo_name",
      key: "ceo_name",
      // responsive: ["xs"],

      render: (record, text) => (
        <Space size="middle" style={{ display: "flex", alignItems: "center" }}>
          <>
            {record.avatar ? (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                }}
              >
                <img
                  src={record.avatar}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50px",
                  }}
                />
              </div>
            ) : (
              <ImgPlaceholderStyled className="img_placeholder" />
            )}
            <span>{record.name}</span>
          </>
        </Space>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      // responsive: ["xs"],
    },
    {
      title: "Sectors",
      dataIndex: "sectors",
      key: "sectors",
      // responsive: ["xs"],
    },

    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
      // responsive: ["xs"],
    },
    {
      title: "Funding (₦)",
      dataIndex: "funding",
      key: "funding",
      // responsive: ["xs"],

      render: (record, key) => {
        // console.log(key);
        let result = record ? record.split("₦") : [];

        return (
          <span>{`${result.length ? numberWithCommas(result[1]) : ""}`}</span>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      // responsive: ["xs"],

      render: (record, key) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => handleApproval(record.id, record)}
              loading={isApprovalLoading}
            >
              Approve
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleApproval = async (id: number, record: IOrganizationProps) => {
    setIsApprovalLoading(true);

    delete record.ceo_image;
    delete record.company_logo;
    delete record.ecosystem;
    delete record.sub_ecosystem;
    delete record.ceo_name;

    try {
      const data: IOrganizationProps = {
        ...record,
        user: auth.user.id,
        is_approve: true,
      };

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await api.editOrganization(id, formData);

      console.log(res.data);

      setIsApprovalLoading(false);

      if (res.status === 201) {
        Modal.success({
          title: "Organization has been approved successfully.",
        });
        refetchPendingApplications();
      }
    } catch (error) {
      console.log(error);
      setIsApprovalLoading(false);
    }
  };

  return (
    <AdminSectionWrapper>
      <PageHeader
        title="Pending Application from various Organizations"
        style={{
          background: "none",
        }}
      />

      <Main>
        <Row>
          <Col span={24}>
            <Cards headless>
              <Table
                className="table-responsive"
                dataSource={organizations.data.map((org, key) => {
                  return {
                    ...org,
                    key: org.id,
                    rank: key + 1,
                    company: org.name,
                    ceo_name: { name: org.ceo_name, avatar: org.ceo_image_url },
                    state: org.state,
                    sectors: org.sector_name || org.sector,
                    employees: org.num_of_employees,
                    funding: org.funding,
                    id: org.id,
                  };
                })}
                columns={columns}
                loading={organizations.isLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default PendingApplications;
