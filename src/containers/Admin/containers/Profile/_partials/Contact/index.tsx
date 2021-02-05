import React, { FC, useEffect, useState } from "react";
import { Col, Row, Menu, Dropdown } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { TableHeaderButtonStyled } from "../../../Dashboard/_partials/Businesses";
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { ViewProfileBtnStyled } from "../../../Dashboard/styled";
import { Geocode } from "./Geocode";
import ErrorMsg from "../../../../../../components/messages/error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sampleAddress = `
        Central Bank of Nigeria
        Plot 33,
        Abubakar Tafawa Balewa Way
        Central Business District,
        Cadastral Zone,
        Abuja,
        Federal Capital Territory,
        Nigeria
`;

const menu = (
  <Menu onClick={() => {}}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

const content = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const libraries: Libraries = ["places"];

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

interface ContactProps {
  selectedOrganization: any;
}

const Contact: FC<ContactProps> = ({ selectedOrganization }) => {
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [error, setError] = useState(null);

  const { name, address, phone, website } = selectedOrganization;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    setIsGeocodingAddress(true);
    if (address) {
      // Get latitude & longitude from address.
      Geocode.fromAddress(address)
        .then(response => {
          if (response.results.length) {
            const { lat, lng } = response.results[0].geometry.location;

            setIsGeocodingAddress(false);
            setMapCenter({
              lat,
              lng,
            });
          }
        })
        .catch(error => {
          console.log({ error });
          setIsGeocodingAddress(false);
          setError("Please restructure address");
        });
    }
  }, [address]);

  // wrapping to a function is useful in case you want to access `window.google`
  // to eg. setup options or create latLng object, it won't be available otherwise
  // feel free to render directly if you don't need that
  const onLoad = React.useCallback(function onLoad(mapInstance) {
    // do something with map Instance
  }, []);

  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Cards
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Contact</span>
              <Dropdown overlay={menu}>
                <TableHeaderButtonStyled type="ghost" size="middle">
                  Past Month <ArrowDown />
                </TableHeaderButtonStyled>
              </Dropdown>
            </div>
          }
          more={content}
        >
          <Row
            style={{
              height: "100%",
            }}
          >
            <Col xs={24} sm={24} md={24} lg={16}>
              {error && <ErrorMsg content={error} />}
              <div style={{ height: "400px" }} className="contact-chart">
                {isLoaded && !isGeocodingAddress ? (
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "100%",
                    }}
                    options={options}
                    zoom={14}
                    onLoad={onLoad}
                    center={mapCenter}
                  >
                    {/* Markers */}
                    <Marker
                      position={mapCenter}
                      onClick={() => {
                        setShowInfo(true);
                      }}
                      onLoad={() => {
                        // console.log(
                        //   `Marker for ${selectedOrganization.name} loaded...`
                        // );
                        setMapCenter({
                          ...mapCenter,
                          lat: mapCenter.lat,
                          lng: mapCenter.lng,
                        });
                      }}
                    />

                    {/* InfoWindow */}
                    {showInfo && (
                      <InfoWindow
                        position={mapCenter}
                        onCloseClick={() => {
                          setShowInfo(false);
                        }}
                      >
                        <div>
                          <h2>{name}</h2>
                          <p>{address}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                ) : (
                  "Loading..."
                )}

                {loadError && <div>Map cannot be loaded right now, sorry.</div>}
              </div>
            </Col>

            <Col xs={24} sm={24} md={16} lg={8}>
              <div style={{ padding: "1.5rem" }}>
                <h2>
                  <strong>{name}</strong>
                </h2>
                <p>{address}</p>

                <a href={website} target="_blank" rel="noreferrer noopener">
                  {website}
                </a>

                <p>
                  <span>{phone}</span>
                </p>

                <ViewProfileBtnStyled>Add to Favorites</ViewProfileBtnStyled>
              </div>
            </Col>
          </Row>
        </Cards>
      </Col>
    </Row>
  );
};

export default Contact;
