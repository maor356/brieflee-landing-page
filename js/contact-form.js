/**
 * Brieflee Contact Form — Slack notification
 * Sends contact form submissions to Slack via incoming webhook.
 */
(function () {
  'use strict';

  var SLACK_WEBHOOK = window.__BRIEFLEE_SLACK_WEBHOOK || '';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('wf-form-Contact-Form');
    if (!form) return;

    var successDiv = form.parentElement.querySelector('.w-form-done');
    var errorDiv = form.parentElement.querySelector('.w-form-fail');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstName = form.querySelector('[name="FirstName"]').value.trim();
      var lastName = form.querySelector('[name="LastName"]').value.trim();
      var email = form.querySelector('[name="Email"]').value.trim();
      var message = form.querySelector('[name="Message"]').value.trim();

      if (!email) return;

      var fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Not provided';

      var payload = JSON.stringify({
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: 'New Contact Form Submission', emoji: true }
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: '*Name:*\n' + fullName },
              { type: 'mrkdwn', text: '*Email:*\n' + email }
            ]
          },
          {
            type: 'section',
            text: { type: 'mrkdwn', text: '*Message:*\n' + (message || '_No message provided_') }
          },
          {
            type: 'context',
            elements: [
              { type: 'mrkdwn', text: 'Sent from brieflee.be contact page' }
            ]
          }
        ]
      });

      // Use no-cors mode for static site Slack webhook integration
      fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        mode: 'no-cors',
        body: payload
      }).then(function () {
        // With no-cors we get an opaque response, so we show success optimistically
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      }).catch(function () {
        if (errorDiv) errorDiv.style.display = 'block';
      });
    });
  });
})();
