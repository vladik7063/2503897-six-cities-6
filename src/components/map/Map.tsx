import React, { useRef, useEffect, memo } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { MapConfig } from '../../const/const';

type MapProps = {
  offers: Offer[];
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom?: number;
    };
  };
  activeOfferId?: string | null;
};

const DEFAULT_ICON = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: MapConfig.IconSize,
  iconAnchor: MapConfig.IconAnchor,
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: MapConfig.IconSize,
  iconAnchor: MapConfig.IconAnchor,
});

const Map: React.FC<MapProps> = ({ offers, city, activeOfferId }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);
  const markersLayerRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom ?? MapConfig.DefaultZoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        )
        .addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom ?? MapConfig.DefaultZoom
      );
    }
  }, [city]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    const markersLayer = leaflet.layerGroup(
      offers.map((offer) =>
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon:
              offer.id === activeOfferId
                ? ACTIVE_ICON
                : DEFAULT_ICON,
          }
        )
      )
    );

    markersLayer.addTo(mapInstanceRef.current);
    markersLayerRef.current = markersLayer;
  }, [offers, activeOfferId]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%' }}
    />
  );
};

const MemoizedMap = memo(Map);

export default MemoizedMap;
