import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInfo } from './users-info';

describe('UsersInfo', () => {
  let component: UsersInfo;
  let fixture: ComponentFixture<UsersInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
