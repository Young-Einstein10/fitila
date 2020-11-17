import { Button, Col, Row } from "antd";
import React from "react";
import Heading from "../../../../components/heading/heading";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";

const About = () => {
  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader title={<Heading as="h2">About</Heading>} />
      </div>

      <Main>
        <Row gutter={16}>
          <Col span={12}>
            <p>
              Blandit tellus, morbi etiam aenean nunc, tristique. Ipsum auctor
              orci fames enim in. Integer vitae amet etiam pharetra. Sit
              pellentesque massa hac suspendisse. Nunc urna risus, odio vivamus.
              Arcu consequat dictum volutpat sit consectetur ultricies arcu.
              Eget vitae risus ornare commodo consequat ut amet amet. Donec sit
              quam posuere tempor id nec sed purus. Vestibulum morbi id
              tincidunt id ullamcorper commodo nunc cursus. n auctor leo. In est
              blandit neque amet, vulputate viverra vivamus. Netus in neque sed
              vel gravida nisi, amet nunc. Fusce integer in at dolor scelerisque
              turpis nam. Tristique sit pellentesque dui sapien, odio
              scelerisque gravida. A morbi pellentesque quis nullam gravida
              malesuada tincidunt sed. Non malesuada penatibus purus libero sed
              vitae pretiujusto, leo vitae viverra et. Commodo egestas dui
              mauris sapien velit suspendisse amet. Viverra cras habitant a
              purus sed. Quam ultricies faucibus integer tortor nam faucibus.
              Tincidunt ipsum, rhoncus, vitae et sagittis. Urna sit posuere
              integer eros auctor eu pellentesque tincidunt vel. Sit mattis est
              est aliquam. Cras aliquet nulla nunc et mattis id nulla neque
              enim. Viverra varius diam sit neque mattis est euismod tincidunt.
              Phasellus adipiscing sed lectus porttitor. Vitae nibh eu arcu,
              diam mollis. Commodo, ut accumsan erat iaculis a tellus integer
              orci. Id turpis eget faucibus nec arcu egestas non. Quis sed
              phasellus ultrices feugiat orci diam duis consectetur. Morbi
              ultricies platea malesuada elit quis scelerisque amet quis.
              Pharetra, in duis porttitor consequat consequat.
            </p>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default About;
