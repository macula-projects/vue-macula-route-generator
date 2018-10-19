import { createRoutes } from '../src/template/routes'
import { PageMeta } from '../src/resolve'

describe('Route template', () => {
  it('should generate routes', () => {
    const meta: PageMeta[] = [
      {
        name: 'test-foo',
        specifier: 'TestFoo',
        path: '/foo',
        pathSegments: ['foo'],
        component: '@/pages/foo.vue'
      },
      {
        name: 'test-bar',
        specifier: 'TestBar',
        path: '/bar',
        pathSegments: ['bar'],
        component: '@/pages/bar.vue'
      }
    ]

    expect(createRoutes(meta, true)).toMatchSnapshot()
  })

  it('should generate nested routes', () => {
    const meta: PageMeta[] = [
      {
        name: 'test-foo',
        specifier: 'TestFoo',
        path: '/foo',
        pathSegments: ['foo'],
        component: '@/pages/foo.vue',
        children: [
          {
            name: 'test-bar',
            specifier: 'TestFooBar',
            path: 'bar',
            pathSegments: ['foo', 'bar'],
            component: '@/pages/bar.vue'
          },
          {
            name: 'test-baz',
            specifier: 'TestFooBaz',
            path: 'baz',
            pathSegments: ['foo', 'baz'],
            component: '@/pages/baz.vue'
          }
        ]
      }
    ]

    expect(createRoutes(meta, true)).toMatchSnapshot()
  })

  it('should generate static import code', () => {
    const meta: PageMeta[] = [
      {
        name: 'test-foo',
        specifier: 'TestFoo',
        path: '/foo',
        pathSegments: ['foo'],
        component: '@/pages/foo.vue'
      },
      {
        name: 'test-bar',
        specifier: 'TestBar',
        path: '/bar',
        pathSegments: ['bar'],
        component: '@/pages/bar.vue'
      }
    ]

    expect(createRoutes(meta, false)).toMatchSnapshot()
  })

  it('should generate route meta', () => {
    const meta: PageMeta[] = [
      {
        name: 'test-foo',
        specifier: 'TestFoo',
        path: '/foo',
        pathSegments: ['foo'],
        component: '@/pages/foo.vue',
        routeMeta: {
          title: 'Hello'
        }
      }
    ]

    expect(createRoutes(meta, false)).toMatchSnapshot()
  })
})
