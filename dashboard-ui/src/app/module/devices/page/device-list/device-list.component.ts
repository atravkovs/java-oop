import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { Page } from 'src/app/module/shared/models/page.model';
import { Device } from '../../models/device.model';
import { HardwareRepositoryService } from '../../services/hardware.repository.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, AfterViewInit {
  query = {
    page: 0,
    search: '',
  };

  refresh$: Subject<string> = new Subject();
  devices$: Observable<Page<Device>> | null = null;

  constructor(private hardwareRepository: HardwareRepositoryService) {}

  ngOnInit(): void {
    this.devices$ = this.refresh$.pipe(
      switchMap(() => {
        return this.hardwareRepository.getDevices(this.query);
      })
    );
  }

  ngAfterViewInit(): void {
    this.refresh$.next('');
  }

  onSearch(): void {
    this.query.page = 0;
    this.refresh$.next('');
  }

  updatePage(page: number): void {
    if (this.query.page !== page) {
      this.query.page = page;
      this.refresh$.next('');
    }
  }

  /**
   * Generates an array of given length
   */
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
