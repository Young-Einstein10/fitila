import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { Geocode } from "./Geocode";
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { ReactComponent as Twitter } from "../../../../../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../../../../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../../../../../static/svg/instagram.svg";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import ErrorMsg from "../../../../../../components/messages/error";
import { SocialWrapper } from "./styled";
import { FacebookIcon } from "../../../../../../components/svgs";
import { startWithHttp } from "../../../../../../utils/helpers";

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

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const libraries: Libraries = ["places"];

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

interface ContactProps {
  isLoading: boolean;
  selectedOrganization?: IOrganizationProps;
}

const Contact: FC<ContactProps> = props => {
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [error, setError] = useState(null);

  const { isLoading } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    setError(null);

    const { address } = props?.selectedOrganization;

    setIsGeocodingAddress(true);
    if (!isLoading && address) {
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
  }, [isLoading, props.selectedOrganization]);

  // wrapping to a function is useful in case you want to access `window.google`
  // to eg. setup options or create latLng object, it won't be available otherwise
  // feel free to render directly if you don't need that
  const onLoad = React.useCallback(function onLoad(mapInstance) {
    // do something with map Instance
  }, []);

  const {
    name,
    address,
    phone,
    website,
    facebook,
    linkedIn,
    twitter,
    instagram,
  } = props?.selectedOrganization && props.selectedOrganization;

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
              {/* <Dropdown overlay={menu}>
                <TableHeaderButtonStyled type="ghost" size="middle">
                  Past Month <ArrowDown />
                </TableHeaderButtonStyled>
              </Dropdown> */}
            </div>
          }
        >
          {isLoading ? (
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Spin />
            </Row>
          ) : (
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

                  {loadError && (
                    <div>Map cannot be loaded right now, sorry.</div>
                  )}
                </div>
              </Col>

              <Col xs={24} sm={24} md={16} lg={8}>
                <div style={{ padding: "1.5rem" }}>
                  <h2>
                    <strong>{name}</strong>
                  </h2>
                  <p>{address}</p>

                  <a
                    href={startWithHttp(website)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {website}
                  </a>

                  <p>
                    <span>{phone}</span>
                  </p>

                  <SocialWrapper>
                    {twitter && (
                      <li>
                        <a
                          className="facebook-sign"
                          target="_blank"
                          rel="noreferrer noopener"
                          href={startWithHttp(twitter)}
                        >
                          <Twitter />
                        </a>
                      </li>
                    )}

                    {facebook && (
                      <li>
                        <a
                          className="facebook-sign"
                          target="_blank"
                          rel="noreferrer noopener"
                          href={startWithHttp(facebook)}
                        >
                          <FacebookIcon />
                        </a>
                      </li>
                    )}

                    {instagram && (
                      <li>
                        <a
                          className="twitter-sign"
                          target="_blank"
                          rel="noreferrer noopener"
                          href={startWithHttp(instagram)}
                        >
                          <Instagram />
                        </a>
                      </li>
                    )}

                    {linkedIn && (
                      <li>
                        <a
                          className="facebook-sign"
                          target="_blank"
                          rel="noreferrer noopener"
                          href={startWithHttp(linkedIn)}
                        >
                          <LinkedIn />
                        </a>
                      </li>
                    )}
                  </SocialWrapper>
                </div>
              </Col>
            </Row>
          )}
        </Cards>
      </Col>
    </Row>
  );
};

export default Contact;
