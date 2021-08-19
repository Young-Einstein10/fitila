import React, { FC } from "react";
import { Col, Row } from "antd";
import { RouteComponentProps } from "react-router-dom";
import SimilarCompanies from "./_partials/SimilarCompanies";
import Contact from "./_partials/Contact";
import Summary from "./_partials/Summary";
import { useOrganizationContext } from "../../../../context";
import { AdminSectionWrapper } from "../../styled";

const Profile: FC<RouteComponentProps> = ({ match }) => {
  const { id: organizationId } = match.params as { id: number };

  const { data: organizations, isLoading } = useOrganizationContext();

  const selectedOrganization = organizations.length
    ? organizations.filter(
        // eslint-disable-next-line eqeqeq
        org => org.id == organizationId
      )
    : [];

  // let counter = 0;

  // const data = [
  //   {
  //     id: 1,
  //     title: "Summary",
  //     tabTitle: "Summary",
  //     content: (
  //       <Summary
  //         isLoading={isLoading}
  //         selectedOrganization={selectedOrganization}
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     title: "Similar Companies",
  //     tabTitle: "Similar Companies",
  //     content: (
  //       <SimilarCompanies selectedOrganization={selectedOrganization[0]} />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     title: "Revenue",
  //     tabTitle: "Revenue",
  //     content: <Revenue />,
  //   },
  //   {
  //     id: 3,
  //     title: "Funding",
  //     tabTitle: "Funding",
  //     content: <Funding />,
  //   },
  //   {
  //     id: 3,
  //     title: "Press Releases",
  //     tabTitle: "Press Releases",
  //     content: <PressReleases />,
  //   },
  //   {
  //     id: 3,
  //     title: "Social Media",
  //     tabTitle: "Social Media",
  //     content: <SocialMedia />,
  //   },
  //   {
  //     id: 3,
  //     title: "Ratings",
  //     tabTitle: "Ratings",
  //     content: <Ratings />,
  //   },
  //   {
  //     id: 3,
  //     title: "Contact",
  //     tabTitle: "Contact",
  //     content: <Contact selectedOrganization={selectedOrganization[0]} />,
  //   },
  // ];

  return (
    <AdminSectionWrapper className="company-profile">
      <Row className="company-profile-row" gutter={25}>
        {/* <Col span={24}>
          <TabBasic defaultActiveKey="1" tabPosition={"top"}>
            {data.map(item => {
              const { content: tabContent, tabTitle } = item;
              counter += 1;
              return (
                <Child tab={tabTitle} key={counter}>
                  <Main className="main-content" style={{ padding: "0" }}>
                    {tabContent}
                  </Main>
                </Child>
              );
            })}
          </TabBasic>
        </Col> */}

        <Col span={24}>
          <Summary
            isLoading={isLoading}
            selectedOrganization={selectedOrganization}
          />

          {selectedOrganization[0] && (
            <Contact
              isLoading={isLoading}
              selectedOrganization={selectedOrganization[0]}
            />
          )}
          <SimilarCompanies
            isLoading={isLoading}
            selectedOrganization={selectedOrganization[0]}
          />
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

export default Profile;
