import { Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges, OnDestroy {
  @Input() order!: Order;
  @Input() readonly: boolean = false;
  private _destroy$ = new Subject<void>();
  private readonly DEFAULT_LATLNG: LatLngTuple = [30.093923, 31.3338075];
  private readonly MARKER_ZOOM_LEVEL= 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  locationIcon: string = '../../../assets/icons/my-location-svgrepo-com.svg';

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;

  map!: Map;
  currentMarker!: Marker;

  set addressLatLng(latlng: LatLng) {
    //this is for the mongodb as it does not accept a float number with more than 8 floating points
    if(!latlng.lat.toFixed) return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

  get addressLatLng(): LatLng {
    return this.order.addressLatLng!;
  }

  constructor(
    private _locationService: LocationService,
  ){}

  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();

    if(this.readonly && this.addressLatLng) {
      this.showLocationOnReadOnly();
    }
  }

  showLocationOnReadOnly() {
    const map = this.map;
    this.setMarker(this.addressLatLng);
    map.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.off('click');
    map.tapHold?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap(): void {
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 2.5);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  findMyLocation(): void {
    this._locationService.getCurrentLocation()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    });
  }

  setMarker(latlng: LatLngExpression): void {
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
