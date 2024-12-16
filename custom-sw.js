self.addEventListener('push', (event) => {
  console.log('Push event recebido:', event);

  if (event.data) {
    const data = event.data.json();
    console.log('Dados recebidos no push:', data);

    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/assets/icons/icon-192x192.png',
      data: {
        url: data.url,
      },
    });
  } else {
    console.warn('Nenhum dado foi recebido no push.');
  }
});


// Evento de clique na notificação
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);

  event.notification.close();

  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(url) // Redireciona para a URL associada
  );
});
