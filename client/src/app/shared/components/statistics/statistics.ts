import { Component, OnInit, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatsService } from '../../../core/services';
import { DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [DecimalPipe, MatProgressSpinnerModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics implements OnInit {
  private statisticsService = inject(StatsService);
  private destroyRef = inject(DestroyRef);

  protected usersCount = signal(0);
  protected carOffersCount = signal(0);

  protected isLoading = signal(false);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true);

    forkJoin({
      users: this.statisticsService.getAllUsersCount(),
      offers: this.statisticsService.getAllCarOffersCount(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ users, offers }) => {
          this.countUp(this.usersCount, users, 1100);
          this.countUp(this.carOffersCount, offers, 1100);
          this.isLoading.set(false);
        },
        error: (err) => {
          const msg = err?.error?.message ?? err?.statusText ?? 'Failed to load stats';
          this.error.set(msg);
          this.isLoading.set(false);
        },
      });
  }

  private countUp(sig: WritableSignal<number>, target: number, duration = 1500) {
    const start = performance.now();
    const from = 0;
    const delta = Math.max(0, target - from);
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      sig.set(Math.round(from + delta * easeOutCubic(t)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
