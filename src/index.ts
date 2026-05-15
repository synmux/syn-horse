export default {
	// async fetch(req, env, ctx): Promise<Response> {
	// 	return new Response('Hello!');
	// },
	// https://developers.cloudflare.com/queues/platform/javascript-apis/#messagebatch
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async queue(batch, env): Promise<void> {
		for (const message of batch.messages) {
			if (typeof message.body !== 'object') {
				const errText = JSON.stringify({
					messageId: message.id,
					obj: message.body,
					message: 'typeof message.body != object',
				});
				console.error(errText);
			}
			const body = message.body as Record<string, unknown> | Error;
			if (body instanceof Error) {
				const errText = JSON.stringify({
					messageId: message.id,
					obj: body,
					message: 'message.body instanceof Error',
				});
				console.error(errText);
			}
			console.info(JSON.stringify(message));
		}
	},
} satisfies ExportedHandler<Env, Error>;
