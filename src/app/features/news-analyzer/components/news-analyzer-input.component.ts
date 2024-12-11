import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

const URL_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
@Component({
  selector: 'news-analyzer-input',
  imports: [ReactiveFormsModule],
  template: `
    <label
      for="search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="flex w-100 justify-center gap-3">
      <input
        [formControl]="newsUrlInput"
        type="search"
        id="search"
        class="p-3 w-2/5"
        placeholder="News URL"
        required
      />
      <button
        type="submit"
        (click)="outputOnSend()"
        class="flex-none bg-white primary-btn"
      >
        <svg
          width="2em"
          height="3em"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7 pointer-events-none"
        >
          <path
            d="M19.593 13.812c-.196.287-.455.53-.758.710L8.594 20.648c-1.13.679-2.591.348-3.262-.735a2.226 2.226 0 01-.25-1.772c.522-1.883.81-3.766.866-5.65a23.312 23.312 0 00-.534-5.66c-.269-1.243.558-2.484 1.845-2.77a2.396 2.396 0 011.811.308l9.88 6.251c1.09.69 1.378 2.12.643 3.193zm-1.53-1.897L8.18 5.661a.79.79 0 00-.598-.101c-.43.095-.704.508-.615.921.38 1.75.573 3.5.577 5.249l3.36.02a.76.76 0 01.771.776.804.804 0 01-.815.765l-3.361-.02a25.37 25.37 0 01-.885 5.239.738.738 0 00.083.587c.223.361.709.47 1.085.245l10.243-6.126a.81.81 0 00.253-.237.749.749 0 00-.215-1.064z"
            fill="currentcolor"
            fill-rule="evenodd"
            style="--darkreader-inline-fill: currentcolor;"
            data-darkreader-inline-fill=""
          ></path>
        </svg>
      </button>
    </div>
  `,
  styles: `
    :host {
      @apply w-screen mb-10;
    }
  `,
})
export class NewsAnalyzerInputComponent {
  @Output() onSend$ = new EventEmitter<string>();

  newsUrlInput = new FormControl('', [
    Validators.required,
    Validators.pattern(URL_REGEX),
  ]);

  outputOnSend() {
    this.newsUrlInput.valid
      ? this.onSend$.emit(this.newsUrlInput.value!)
      : alert('send a valid url');
  }
}
