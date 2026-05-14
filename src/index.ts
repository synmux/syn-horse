export default {
	// async fetch(req, env, ctx): Promise<Response> {
	// 	return new Response('Hello!');
	// },
	// https://developers.cloudflare.com/queues/platform/javascript-apis/#messagebatch
	async queue(batch, env): Promise<void> {
		for (let message of batch.messages) {
			if (typeof message.body != 'object') {
				let errText = JSON.stringify({
					messageId: message.id,
					obj: message.body,
					message: 'typeof message.body != object',
				});
				console.error(errText);
			}
			let body = message.body as Record<string, unknown> | Error;
			if (body instanceof Error) {
				let errText = JSON.stringify({
					messageId: message.id,
					obj: body,
					message: 'message.body instanceof Error',
				});
				console.error(errText);
			}
		}
	},
} satisfies ExportedHandler<Env, Error>;
