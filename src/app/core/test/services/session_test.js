(function(){
	'use strict';

	describe('Services: session', function() {
		
		beforeEach(module('core'));

		var appSession;
		var scope;
		var user = {
			username: 'admin',
			password: 'admin'
		};

		beforeEach(inject(function($rootScope, session){
			appSession = session;
			scope = $rootScope;
		}));

		it('Deve inserir usuário', function(){
			var add = appSession.add('currentUser', user);

			expect(add).equal(true);

		});

		it('Deve pegar o usuario', function() {
			var usuario;

			appSession.add('currentUser',user);
			usuario = appSession.get('currentUser');

			expect(usuario.username).equal(user.username);
			expect(usuario.password).equal(user.password);
		});

	});
})();