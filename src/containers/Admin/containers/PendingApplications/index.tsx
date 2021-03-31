import React, { useEffect, useState } from "react";
import { Modal, Button, Col, Row, Space, Table } from "antd";
import Axios from "axios";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { useApiContext } from "../../../../context";
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
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);

  const { organization: api } = useApiContext();

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
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Ceo/Founder",
      dataIndex: "ceo_name",
      key: "ceo_name",

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
    },
    {
      title: "Sectors",
      dataIndex: "sectors",
      key: "sectors",
    },

    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Funding (₦)",
      dataIndex: "funding",
      key: "funding",

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

      render: (record, key) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => handleDecline(record.id)}
              loading={isDeclineLoading}
              danger
            >
              Decline
            </Button>
            <Button
              type="primary"
              onClick={() => handleApproval(record.id)}
              loading={isApprovalLoading}
            >
              Approve
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleDecline = async (id: number) => {
    setIsDeclineLoading(true);

    try {
      const res = await api.declineOrganization(id);

      console.log(res.data);

      if (res.status === 200) {
        Modal.success({
          title: "Organization has been declined.",
        });
        refetchPendingApplications();
      }

      setIsDeclineLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsDeclineLoading(false);
    }
  };

  const handleApproval = async (id: number) => {
    setIsApprovalLoading(true);

    try {
      const res = await api.approveOrganization(id);

      console.log(res.data);

      setIsApprovalLoading(false);

      if (res.status === 200) {
        Modal.success({
          title: "Organization has been approved.",
        });
        refetchPendingApplications();
      }
    } catch (error) {
      console.log(error);
      setIsApprovalLoading(false);
    }
  };

  const dataSource = organizations.data.map((org, key) => {
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
  });

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
                dataSource={dataSource}
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
