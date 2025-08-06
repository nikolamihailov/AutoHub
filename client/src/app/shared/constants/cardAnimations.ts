import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const cardAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.85) translateY(30px)' }),
    animate('300ms cubic-bezier(.43,.68,.52,1.01)', style({ opacity: 1, transform: 'none' })),
  ]),
  transition(':leave', [
    animate(
      '200ms cubic-bezier(.7,.15,.53,1.05)',
      style({ opacity: 0, transform: 'scale(0.85) translateY(30px)' }),
    ),
  ]),
]);

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'scale(0.95) translateY(40px)' }),
        stagger(30, [
          animate('300ms cubic-bezier(.42,0,.58,1)', style({ opacity: 1, transform: 'none' })),
        ]),
      ],
      { optional: true },
    ),
  ]),
]);
