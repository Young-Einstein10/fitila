import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import Heading from '../../components/heading/heading';
import { ReactComponent as Search } from '../../static/svg/search.svg';
import { SectionWrapper } from './styled';
import './styles.less';

const Landing = () => {
  const handleSubmit = () => {};

  const links = [
    'Business Support',
    'Training',
    'Funding',
    'Market Access',
    'Research',
    'Policy Regulation',
    'Resources',
    'Businesses',
  ];

  return (
    <SectionWrapper>
      <Form className="landing" name="login" onFinish={handleSubmit} layout="vertical" style={{ paddingTop: '3rem' }}>
        <Heading className="text-center" as="h1">
          Access Over 6000+ Data Points
        </Heading>

        <p className="text-center">Gain credible insights into Nigeria's entrepreneurship ecosystem</p>

        <Form.Item name="search__box" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <Input.Search size="large" placeholder="Search by Organization, Sector and States" style={{ width: '80%' }} />
        </Form.Item>
      </Form>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '60px',
        }}
      >
        <p style={{ fontSize: '16px', color: '#1D429C', fontWeight: 'bold' }}>Explore ecosystem players by segment</p>

        <Row style={{ maxWidth: '800px', margin: '0px auto', justifyContent: 'center' }}>
          {links.map((business, key) => (
            <Col key={key} className="text-center">
              <Button
                type="primary"
                icon={<Search style={{ marginRight: '10px' }} />}
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#BF1E2E',
                  background: '#FFECDD',
                  marginLeft: '15px',
                  marginTop: '20px',
                }}
              >
                {business}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </SectionWrapper>
  );
};

export default Landing;
