# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[**GenAI apps + MongoDB Atlas** You don't need a separate database to start
building GenAI-powered
apps.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8270/0194f710-1b51-7363-9dd3-a9e709d626d3/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#skip-nav

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with MongoDB Atlas, the leading developer data
platform](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8268/0194f710-3b94-7520-bac0-9e437e68a3ac/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# Hi 👋, I'm Dominik from Vienna 🇦🇹
URL: https://tkdodo.eu/blog

#  Hi 👋, I'm Dominik from Vienna 🇦🇹

I'm a Web Developer and open source maintainer who ❤️ ReactJs and TypeScript.
I'm currently maintaining and .

Welcome to my personal blog 📚, where I write about all things React, TypeScript
and of course the . If you enjoy my blog posts or want to support my open source
work, you can [🎗 sponsor me on Github
🎗](https://tkdodo.eu/<https:/github.com/sponsors/TkDodo>)

[React Query - The Bad Parts](https://tkdodo.eu/</blog/react-query-the-bad-
parts>)

[Ref Callbacks, React 19 and the Compiler](https://tkdodo.eu/</blog/ref-
callbacks-react-19-and-the-compiler>)

[My Slow Retreat from Twitter](https://tkdodo.eu/</blog/my-slow-retreat-from-
twitter>)

[React Query API Design - Lessons Learned](https://tkdodo.eu/</blog/react-query-
api-design-lessons-learned>)

[Component Composition is great btw](https://tkdodo.eu/</blog/component-
composition-is-great-btw>)

---

# [React Query - The Bad Parts](https://tkdodo.eu/blog/</blog/react-query-the-bad-
URL: https://tkdodo.eu/blog/all

[React Query - The Bad Parts](https://tkdodo.eu/blog/</blog/react-query-the-bad-
parts>)

[Ref Callbacks, React 19 and the Compiler](https://tkdodo.eu/blog/</blog/ref-
callbacks-react-19-and-the-compiler>)

[My Slow Retreat from Twitter](https://tkdodo.eu/blog/</blog/my-slow-retreat-
from-twitter>)

[React Query API Design - Lessons Learned](https://tkdodo.eu/blog/</blog/react-
query-api-design-lessons-learned>)

[Component Composition is great btw](https://tkdodo.eu/blog/</blog/component-
composition-is-great-btw>)

[Please Stop Using Barrel Files](https://tkdodo.eu/blog/</blog/please-stop-
using-barrel-files>)

[React 19 and Suspense - A Drama in 3
Acts](https://tkdodo.eu/blog/</blog/react-19-and-suspense-a-drama-in-3-acts>)

[Automatic Query Invalidation after
Mutations](https://tkdodo.eu/blog/</blog/automatic-query-invalidation-after-
mutations>)

[Avoiding Hydration Mismatches with
useSyncExternalStore](https://tkdodo.eu/blog/</blog/avoiding-hydration-
mismatches-with-use-sync-external-store>)

[The Uphill Battle of Memoization](https://tkdodo.eu/blog/</blog/the-uphill-
battle-of-memoization>)

[React Query and React Context](https://tkdodo.eu/blog/</blog/react-query-and-
react-context>)

[You Might Not Need React Query](https://tkdodo.eu/blog/</blog/you-might-not-
need-react-query>)

[Breaking React Query's API on purpose](https://tkdodo.eu/blog/</blog/breaking-
react-querys-api-on-purpose>)

[Refs, Events and Escape Hatches](https://tkdodo.eu/blog/</blog/refs-events-and-
escape-hatches>)

[React Query meets React Router](https://tkdodo.eu/blog/</blog/react-query-
meets-react-router>)

[Avoiding useEffect with callback refs](https://tkdodo.eu/blog/</blog/avoiding-
use-effect-with-callback-refs>)

[Hooks, Dependencies and Stale Closures](https://tkdodo.eu/blog/</blog/hooks-
dependencies-and-stale-closures>)

[Leveraging the Query Function
Context](https://tkdodo.eu/blog/</blog/leveraging-the-query-function-context>)

[Mastering Mutations in React Query](https://tkdodo.eu/blog/</blog/mastering-
mutations-in-react-query>)

[React Query as a State Manager](https://tkdodo.eu/blog/</blog/react-query-as-a-
state-manager>)

[Placeholder and Initial Data in React
Query](https://tkdodo.eu/blog/</blog/placeholder-and-initial-data-in-react-
query>)

[Using WebSockets with React Query](https://tkdodo.eu/blog/</blog/using-web-
sockets-with-react-query>)

[How can I ... ?](https://tkdodo.eu/blog/</blog/how-can-i>)

[Status Checks in React Query](https://tkdodo.eu/blog/</blog/status-checks-in-
react-query>)

[No love for boolean parameters](https://tkdodo.eu/blog/</blog/no-love-for-
boolean-parameters>)

[Things to know about useState](https://tkdodo.eu/blog/</blog/things-to-know-
about-use-state>)

[Flow to TypeScript migration journey](https://tkdodo.eu/blog/</blog/flow-to-
type-script-migration-journey>)

[The power of const assertions](https://tkdodo.eu/blog/</blog/the-power-of-
const-assertions>)

[Pedantic index signatures in TypeScript
4.1](https://tkdodo.eu/blog/</blog/pedantic-index-signatures-in-type-
script-4-1>)

[Why I don't like reduce](https://tkdodo.eu/blog/</blog/why-i-dont-like-reduce>)

---

# [🎗 Sponsor me on Github
URL: https://tkdodo.eu/blog/sponsors

### [🎗 Sponsor me on Github
🎗](https://tkdodo.eu/blog/<https:/github.com/sponsors/TkDodo>)

---

# [React Query - The Bad Parts](https://tkdodo.eu/blog/tags/</blog/react-query-
URL: https://tkdodo.eu/blog/tags/react-js

[React Query - The Bad Parts](https://tkdodo.eu/blog/tags/</blog/react-query-
the-bad-parts>)

[Ref Callbacks, React 19 and the
Compiler](https://tkdodo.eu/blog/tags/</blog/ref-callbacks-react-19-and-the-
compiler>)

[React Query API Design - Lessons
Learned](https://tkdodo.eu/blog/tags/</blog/react-query-api-design-lessons-
learned>)

[React 19 and Suspense - A Drama in 3
Acts](https://tkdodo.eu/blog/tags/</blog/react-19-and-suspense-a-drama-
in-3-acts>)

[Automatic Query Invalidation after
Mutations](https://tkdodo.eu/blog/tags/</blog/automatic-query-invalidation-
after-mutations>)

[Avoiding Hydration Mismatches with
useSyncExternalStore](https://tkdodo.eu/blog/tags/</blog/avoiding-hydration-
mismatches-with-use-sync-external-store>)

[React Query and React Context](https://tkdodo.eu/blog/tags/</blog/react-query-
and-react-context>)

[You Might Not Need React Query](https://tkdodo.eu/blog/tags/</blog/you-might-
not-need-react-query>)

[Breaking React Query's API on
purpose](https://tkdodo.eu/blog/tags/</blog/breaking-react-querys-api-on-
purpose>)

[Refs, Events and Escape Hatches](https://tkdodo.eu/blog/tags/</blog/refs-
events-and-escape-hatches>)

[React Query meets React Router](https://tkdodo.eu/blog/tags/</blog/react-query-
meets-react-router>)

[Avoiding useEffect with callback
refs](https://tkdodo.eu/blog/tags/</blog/avoiding-use-effect-with-callback-
refs>)

[Hooks, Dependencies and Stale
Closures](https://tkdodo.eu/blog/tags/</blog/hooks-dependencies-and-stale-
closures>)

[Leveraging the Query Function
Context](https://tkdodo.eu/blog/tags/</blog/leveraging-the-query-function-
context>)

[Mastering Mutations in React
Query](https://tkdodo.eu/blog/tags/</blog/mastering-mutations-in-react-query>)

[React Query as a State Manager](https://tkdodo.eu/blog/tags/</blog/react-query-
as-a-state-manager>)

[Placeholder and Initial Data in React
Query](https://tkdodo.eu/blog/tags/</blog/placeholder-and-initial-data-in-react-
query>)

[Using WebSockets with React Query](https://tkdodo.eu/blog/tags/</blog/using-
web-sockets-with-react-query>)

[No love for boolean parameters](https://tkdodo.eu/blog/tags/</blog/no-love-for-
boolean-parameters>)

[Flow to TypeScript migration journey](https://tkdodo.eu/blog/tags/</blog/flow-
to-type-script-migration-journey>)

---

# [React Query - The Bad Parts](https://tkdodo.eu/blog/tags/</blog/react-query-
URL: https://tkdodo.eu/blog/tags/react-query

[React Query - The Bad Parts](https://tkdodo.eu/blog/tags/</blog/react-query-
the-bad-parts>)

[React Query API Design - Lessons
Learned](https://tkdodo.eu/blog/tags/</blog/react-query-api-design-lessons-
learned>)

[React 19 and Suspense - A Drama in 3
Acts](https://tkdodo.eu/blog/tags/</blog/react-19-and-suspense-a-drama-
in-3-acts>)

[Automatic Query Invalidation after
Mutations](https://tkdodo.eu/blog/tags/</blog/automatic-query-invalidation-
after-mutations>)

[React Query and React Context](https://tkdodo.eu/blog/tags/</blog/react-query-
and-react-context>)

[You Might Not Need React Query](https://tkdodo.eu/blog/tags/</blog/you-might-
not-need-react-query>)

[Breaking React Query's API on
purpose](https://tkdodo.eu/blog/tags/</blog/breaking-react-querys-api-on-
purpose>)

[React Query meets React Router](https://tkdodo.eu/blog/tags/</blog/react-query-
meets-react-router>)

[Leveraging the Query Function
Context](https://tkdodo.eu/blog/tags/</blog/leveraging-the-query-function-
context>)

[Mastering Mutations in React
Query](https://tkdodo.eu/blog/tags/</blog/mastering-mutations-in-react-query>)

[React Query as a State Manager](https://tkdodo.eu/blog/tags/</blog/react-query-
as-a-state-manager>)

[Placeholder and Initial Data in React
Query](https://tkdodo.eu/blog/tags/</blog/placeholder-and-initial-data-in-react-
query>)

[Using WebSockets with React Query](https://tkdodo.eu/blog/tags/</blog/using-
web-sockets-with-react-query>)

[Status Checks in React Query](https://tkdodo.eu/blog/tags/</blog/status-checks-
in-react-query>)

---

# * **#2: React Query Data Transformations**
URL: https://tkdodo.eu/blog/react-query-data-transformations

* **#2: React Query Data Transformations**
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[a more flexible and intuitive way to work with
data.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8277/0194f710-b528-7123-abc2-80c932b22a35/>)

Welcome to Part 2 of "Things I have to say about react-query". As I've become
more and more involved with the library and the community around it, I've
observed some more patterns people frequently ask about. Initially, I wanted to
write them all down in one big article, but then decided to break them down into
more manageable pieces. The first one is about a quite common and important
task: Data Transformation.

Let's face it - most of us are using GraphQL. If you do, then you can be very
happy because you have the luxury of requesting your data in the format that you
desire.

If you are working with REST though, you are constrained by what the backend
returns. So how and where do you best transform data when working with react-
query? The only answer worth a damn in software development applies here as
well:

Here are 3+1 approaches on where you transform data with their respective pros
and cons:

This is my favourite approach, if you can afford it. If the backend returns data
in exactly the structure we want, there is nothing we need to do. While this
might sound unrealistic in many cases, e.g. when working with public REST APIs,
it is also quite possible to achieve in enterprise applications. If you are in
control of the backend and have an endpoint that returns data for your exact
use-case, prefer to deliver the data the way you expect it.

🟢 no work on the frontend 🔴 not always possible

The is the function that you pass to . It expects you to return a Promise, and
the resulting data winds up in the query cache. But it doesn't mean that you
have to absolutely return data in the structure that the backend delivers here.
You can transform it before doing so:

```

CopyqueryFn-transformation: copy code to clipboard

```

On the frontend, you can then work with this data "as if it came like this from
the backend". No where in your code will you actually work with todo names that
are upper-cased. You will also have access to the original structure. If you
look at the react-query-devtools, you will see the transformed structure. If you
look at the network trace, you'll see the original structure. This might be
confusing, so keep that in mind.

Also, there is no optimization that react-query can do for you here. Every time
a fetch is executed, your transformation will run. If it's expensive, consider
one of the other alternatives. Some companies also have a shared api layer that
abstracts data fetching, so you might not have access to this layer to do your
transformations.

🟢 very "close to the backend" in terms of co-location 🟡 the transformed
structure winds up in the cache, so you don't have access to the original
structure 🔴 runs on every fetch 🔴 not feasible if you have a shared api layer
that you cannot freely modify

### 2. In the render function

As advised in , if you create custom hooks, you can easily do transformations
there:

```

Copyrender-transformation: copy code to clipboard

```

As it stands, this will not only run every time your fetch function runs, but
actually on every render (even those that do not involve data fetching). This is
likely not a problem at all, but if it is, you can optimize with . Be careful to
define your dependencies . inside the queryInfo will be referentially stable
unless something really changed (in which case you want to recompute your
transformation), but the itself will . If you add as your dependency, the
transformation will again run on every render:

```

CopyuseMemo-dependencies: copy code to clipboard

// 🚨 don't do this - the useMemo does nothing at all here!

// ✅ correctly memoizes by queryInfo.data

```

Especially if you have additional logic in your custom hook to combine with your
data transformation, this is a good option. Be aware that data can be
potentially undefined, so use optional chaining when working with it.

🟢 optimizable via useMemo 🟡 exact structure cannot be inspected in the devtools
🔴 a bit more convoluted syntax 🔴 data can be potentially undefined 🔴 not
recommended with tracked queries

### 3. using the select option

v3 introduced built-in selectors, which can also be used to transform data:

```

Copyselect-transformation: copy code to clipboard

```

selectors will only be called if exists, so you don't have to care about here.
Selectors like the one above will also run on every render, because the
functional identity changes (it's an inline function). If your transformation is
expensive, you can memoize it either with useCallback, or by extracting it to a
stable function reference:

```

Copyselect-memoizations: copy code to clipboard

// ✅ uses a stable function reference

// ✅ memoizes with useCallback

```

Further, the select option can also be used to subscribe to only parts of the
data. This is what makes this approach truly unique. Consider the following
example:

```

Copyselect-partial-subscriptions: copy code to clipboard

```

Here, we've created a like API by passing a custom selector to our . The custom
hooks still works like before, as will be if you don't pass it, so the whole
state will be returned.

But if you pass a selector, you are now only subscribed to the result of the
selector function. This is quite powerful, because it means that even if we
update the name of a todo, our component that only subscribes to the count via
will rerender. The count hasn't changed, so react-query can choose to inform
this observer about the update 🥳 (Please note that this is a bit simplified here
and technically not entirely true - I will talk in more detail about render
optimizations in Part 3).

🟢 best optimizations 🟢 allows for partial subscriptions 🟡 structure can be
different for every observer 🟡 structural sharing is performed twice (I will
also talk about this in more detail in )

That's all I have for today 👋. Feel free to reach out to me on , if you have any
questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/react-query-render-optimizations

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * **#3: React Query Render Optimizations**
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[a more flexible and intuitive way to work with
data.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8277/0194f710-c901-7693-b719-6a91bf199b53/>)

I've already written quite a bit about render optimizations when describing the
select option in [#2: React Query Data
Transformations](https://tkdodo.eu/blog/<react-query-data-transformations>).
However, "Why does React Query re-render my component two times even though
nothing changed in my data" is the question I probably needed to answer the most
(apart from maybe: "Where can I find the v2 docs" 😅). So let me try to explain
it in-depth.

I haven't been entirely honest in the when I said that this component will only
re-render if the length of todos change:

```

Copycount-component: copy code to clipboard

```

Every time you make a background refetch, this component will re-render twice
with the following query info:

```

{ status: 'success', data: 2, isFetching: true }

{ status: 'success', data: 2, isFetching: false }

```

That is because React Query exposes a lot of meta information for each query,
and is one of them. This flag will always be true when a request is in-flight.
This is quite useful if you want to display a background loading indicator. But
it's also kinda unnecessary if you don't do that.

For this use-case, React Query has the option. It can be set on a per-observer
level to tell React Query: Please only inform this observer about changes if one
of these props change. By setting this option to , we will find the optimized
version we seek:

```

Copyoptimized-with-notifyOnChangeProps: copy code to clipboard

```

You can see this in action in the example in the docs.

While the above code works well, it can get out of sync quite easily. What if we
want to react to the , too? Or we start to use the flag? We have to keep the
list in sync with whichever fields we are actually using in our components. If
we forget to do that, and we only observe the property, but get an that we also
display, our component will not re-render and is thus outdated. This is
especially troublesome if we hard-code this in our custom hook, because the hook
does not know what the component will actually use:

```

Copyoutdated-component: copy code to clipboard

// 🚨 we are using error,

// but we are not getting notified if error changes!

```

As I have hinted in the disclaimer in the beginning, I think this is way worse
than the occasional unneeded re-render. Of course, we can pass the option to the
custom hook, but this still feels quite manual and boilerplate-y. Is there a way
to do this automatically? Turns out, there is:

I'm quite proud of this feature, given that it was my first major contribution
to the library. If you set to , React Query will keep track of the fields you
are using during render, and will use this to compute the list. This will
optimize exactly the same way as specifying the list manually, except that you
don't have to think about it. You can also turn this on globally for all your
queries:

```

Copytracked-queries: copy code to clipboard

```

With this, you never have to think about re-renders again. Of course, tracking
the usages has a bit of an overhead as well, so make sure you use this wisely.
There are also some limitations to tracked queries, which is why this is an opt-
in feature:

  * If you use , you are effectively observing all fields. Normal destructuring is fine, just don't do this:

```

Copyproblematic-rest-destructuring: copy code to clipboard

// 🚨 will track all fields

// ✅ this is totally fine

```

  * Tracked queries only work "during render". If you only access fields during effects, they will not be tracked. This is quite the edge case though because of dependency arrays:

```

Copytracking-effects: copy code to clipboard

// 🚨 will not corectly track data

// ✅ fine because the dependency array is accessed during render

```

  * Tracked queries don't reset on each render, so if you track a field once, you'll track it for the lifetime of the observer:

```

Copyno-reset: copy code to clipboard

// 🟡 we will track the data field if someCondition was true in any previous
render cycle

```

A different, but no less important render optimization that React Query has
turned on out of the box is . This feature makes sure that we keep referential
identity of our on every level. As an example, suppose you have the following
data structure:

```

```

Now suppose we transition our first todo into the state, and we make a
background refetch. We'll get a completely new json from our backend:

```

 { "id": 1, "name": "Learn React", "status": "active" },

 { "id": 1, "name": "Learn React", "status": "done" },

 { "id": 2, "name": "Learn React Query", "status": "todo" }

```

Now React Query will attempt to compare the old state and the new and keep as
much of the previous state as possible. In our example, the todos array will be
new, because we updated a todo. The object with id 1 will also be new, but the
object for id 2 will be the same reference as the one in the previous state -
React Query will just copy it over to the new result because nothing has changed
in it.

This comes in very handy when using selectors for partial subscriptions:

```

Copyoptimized-selectors: copy code to clipboard

// ✅ will only re-render if _something_ within todo with id:2 changes

// thanks to structural sharing

```

As I've hinted before, for selectors, structural sharing will be done twice:
Once on the result returned from the to determine if anything changed at all,
and then once more on the of the selector function. In some instances,
especially when having very large datasets, structural sharing be a bottleneck.
It also only works on json-serializable data. If you don't need this
optimization, you can turn it off by setting on any query.

Have a look at the if you want to learn more about what happens under the hood.

Phew, this was quite a handful. Feel free to reach out to me on if you have any
questions, or just leave a comment below. ⬇️ I'm always happy to help!

Like the monospace font in the code blocks?

---

# Status Checks in React Query
URL: https://tkdodo.eu/blog/status-checks-in-react-query

# Status Checks in React Query

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * **#4: Status Checks in React Query**
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Find out how Algolia AI Search can instantly and precisely understand your
user's
intent.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8293/0194f710-dc29-7fb3-a46b-1ff8ca6ecf37/>)

One advantage of React Query is the easy access to status fields of the query.
You instantly know if your query is loading or if it's erroneous. For this, the
library exposes a bunch of boolean flags, which are mostly derived from the
internal state machine. Looking at , your query can be in one of the following
states:

  * : Your query was successful, and you have for it
  * : Your query did not work, and an is set
  * : Your query has no data

Note that the flag is part of the internal state machine - it is an additional
flag that will be true whenever a request is in-flight. You can be fetching and
success, you can be fetching and error - but you cannot be loading and success
at the same time. The state machine makes sure of that.

Most examples look something like this:

```

Copystandard-example: copy code to clipboard

'An error has occurred: '

```

Here, we check for pending and error first, and then display our data. This is
probably fine for some use-cases, but not for others. Many data fetching
solutions, especially hand-crafted ones, have no refetch mechanism, or only
refetch on explicit user interactions.

It refetches quite aggressively per default, and does so without the user
actively requesting a refetch. The concepts of , and are great for keeping your
data accurate, but they might cause a confusing ux if such an automatic
background refetch fails.

In many situations, if a background refetch fails, it could be silently ignored.
But the code above does not do that. Let's look at two examples:

  * The user opens a page, and the initial query loads successfully. They are working on the page for some time, then switch browser tabs to check emails. They come back some minutes later, and React Query will do a background refetch. Now that fetch fails.
  * Our user is on page with a list view, and they click on one item to drill down to the detail view. This works fine, so they go back to the list view. Once they go to the detail view again, they will see data from the cache. This is great - except if the background refetch fails.

In both situations, our query will be in the following state:

```

```

As you can see, we will have an error the stale data available. This is what
makes React Query great - it embraces the stale-while-revalidate caching
mechanism, which means it will always give you data if it exists, even if it's
stale.

Now it's up to us to decide what we display. Is it important to show the error?
Is it enough to show the stale data only, if we have any? Should we show both,
maybe with a little indicator?

There is no clear answer to this question - it depends on your exact use-case.
However, given the two above examples, I think it would be a somewhat confusing
user experience if data would be replaced with an error screen.

This is even more relevant when we take into account that React Query will retry
failed queries three times per default with exponential backoff, so it might
take a couple of seconds until the stale data is replaced with the error screen.
If you also have no background fetching indicator, this can be really
perplexing.

This is why I usually check for data-availability first:

```

Copydata-first: copy code to clipboard

'An error has occurred: '

```

Again, there is no clear principle of what is right, as it is highly dependent
on the use-case. Everyone should be aware of the consequences that aggressive
refetching has, and we have to structure our code accordingly rather than
strictly following the simple todo-examples 😉.

Special thanks go to who first highlighted to me why this pattern of status
checking can be harmful in some situations.

Feel free to reach out to me on if you have any questions, or just leave a
comment below ⬇️

Like the monospace font in the code blocks?

---

# Photo by
URL: https://tkdodo.eu/blog/testing-react-query

Photo by

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[video to see firsthand how to upgrade your site with end-to-end AI
Search.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8294/0194f710-ed5c-7753-ab48-bcf783b26528/>)

Questions around the testing topic come up quite often together with React
Query, so I'll try to answer some of them here. I think one reason for that is
that testing "smart" components (also called ) is not the easiest thing to do.
With the rise of hooks, this split has been largely deprecated. It is now
encouraged to consume hooks directly where you need them rather than doing a
mostly arbitrary split and drill props down.

I think this is generally a very good improvement for colocation and code
readability, but we now have more components that consume dependencies outside
of "just props".

They might . They might . Or they might .

Those components are technically no longer pure, because calling them in
different environments leads to different results. When testing them, you need
to carefully setup those surrounding environments to get things working.

Since React Query is an async server state management library, your components
will likely make requests to a backend. When testing, this backend is not
available to actually deliver data, and even if, you likely don't want to make
your tests dependent on that.

There are tons of articles out there on how to mock data with jest. You can mock
your api client if you have one. You can mock fetch or axios directly. I can
only second what Kent C. Dodds has written in his article :

It can be your single source of truth when it comes to mocking your apis:

  * works in node for testing
  * has a so you can write stories for your components that 
  * works in the browser for development purposes, and you'll still see the requests going out in the browser devtools
  * works with cypress, similar to fixtures

With our network layer being taken care of, we can start talking about React
Query specific things to keep an eye on:

Whenever you use React Query, you need a QueryClientProvider and give it a
queryClient - a vessel which holds the . The cache will in turn hold the data of
your queries.

I prefer to give each test its own QueryClientProvider and create a for each
test. That way, tests are completely isolated from each other. A different
approach might be to clear the cache after each test, but I like to keep shared
state between tests as minimal as possible. Otherwise, you might get unexpected
and flaky results if you run your tests in parallel.

If you are testing custom hooks, I'm quite certain you're using . It's the
easiest thing there is to test hooks. With that library, we can wrap our hook in
a , which is a React component to wrap the test component in when rendering. I
think this is the perfect place to create the QueryClient, because it will be
executed once per test:

```

Copywrapper: copy code to clipboard

// ✅ creates a new QueryClient for each test

```

If you want to test a Component that uses a hook, you also need to wrap that
Component in QueryClientProvider. A small wrapper around from seems like a good
choice. Have a look at how React Query does it .

It's one of the most common "gotchas" with React Query and testing: The library
defaults to three retries with exponential backoff, which means that your tests
are likely to timeout if you want to test an erroneous query. The easiest way to
turn retries off is, again, via the . Let's extend the above example:

```

Copyno-retries: copy code to clipboard

// ✅ turns retries off

```

This will set the defaults for all queries in the component tree to "no
retries". It is important to know that this will only work if your actual has no
explicit retries set. If you have a query that wants 5 retries, this will still
take precedence, because defaults are only taken as a fallback.

The best advice I can give you for this problem is: Don't set these options on
directly. Try to use and override the defaults as much as possible, and if you
really need to change something for specific queries, use .

So for example, instead of setting retry on :

```

Copynot-on-useQuery: copy code to clipboard

// 🚨 you cannot override this setting for tests!

```

```

CopysetQueryDefaults: copy code to clipboard

// ✅ only todos will retry 5 times

```

Here, all queries will retry two times, only will retry five times, and I still
have the option to turn it off for all queries in my tests 🙌.

Of course, this only works for known query keys. Sometimes, you really want to
set some configs on a subset of your component tree. In v2, React Query had a
for that exact use-case. You can achieve the same thing in v3 with a couple of
lines of codes:

```

CopyReactQueryConfigProvider: copy code to clipboard

```

You can see this in action in this .

Since React Query is async by nature, when running the hook, you won't
immediately get a result. It usually will be in loading state and without data
to check. The from react-hooks-testing-library offer a lot of ways to solve this
problem. For the simplest case, we can just wait until the query has
transitioned to success state:

```

CopywaitFor: copy code to clipboard

// ✅ wait until the query has transitioned to success state

```

I've set up a quick repository where all of this comes nicely together: mock-
service-worker, react-testing-library and the mentioned wrapper. It contains
four tests - basic failure and success tests for custom hooks and components.
Have a look here:

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/react-query-and-type-script

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * **#6: React Query and TypeScript**
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Transform docs into structured data with
Sensible.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8224/0194f711-01e2-7c51-a187-1a419d756dc8/>)

is 🔥 - this seems to be a common understanding now in the frontend community.
Many developers expect libraries to either be written in TypeScript, or at least
provide good type definitions. For me, if a library is written in TypeScript,
the type definitions are the best documentation there is. It's never wrong
because it directly reflects the implementation. I frequently look at type
definitions before I read API docs.

React Query was initially written in JavaScript (v1), and was then re-written to
TypeScript with v2. This means that right now, there is very good support for
TypeScript consumers.

There are however a couple of "gotchas" when working with TypeScript due to how
dynamic and unopinionated React Query is. Let's go through them one by one to
make your experience with it even better.

React Query heavily uses . This is necessary because the library does not
actually fetch data for you, and it cannot know what the data will have that
your api returns.

The TypeScript section in the is not very extensive, and it tells us to
explicitly specify the Generics that expects when calling it:

```

Copyexplicit-generics: copy code to clipboard

```

Over time, React Query has added more Generics to the hook (there are now four
of them), mainly because more functionality was added. The above code works, and
it will make sure that the property of our custom hook is correctly typed to as
well as that our will be of type . But it will not work like that for more
advanced use-cases, especially when the other two Generics are needed.

This is the current definition of the hook:

```

CopyuseQuery: copy code to clipboard

```

There's a lot of stuff going on, so let's try to break it down:

  * : the type returned from the . In the above example, it's .
  * : the type of Errors to expect from the . in the example.
  * : the type our property will eventually have. Only relevant if you use the option, because then the property can be different from what the returns. Otherwise, it will default to whatever the returns.
  * : the type of our , only relevant if you use the that is passed to your .

As you can also see, all those Generics have default values, which means that if
you don't provide them, TypeScript will fall back to those types. This works
pretty much the same as default parameters in JavaScript:

```

Copydefault-parameters: copy code to clipboard

```

TypeScript works best if you let it infer (or figure out) what type something
should be on its own. Not only does it make code easier to (because you don't
have to type all the types 😅), but it will also make it easier to . In many
instances, it can make code look exactly like JavaScript. Some simple examples
of type inference would be:

```

Copytype-inference: copy code to clipboard

// 🚀 both greeting and the result of greet will be string

```

When it comes to Generics, they can also generally be inferred from their usage,
which is super awesome. You could also provide them manually, but in many cases,
you don't need to.

```

Copygeneric-identity: copy code to clipboard

// 🚨 no need to provide the generic

// ⚠️ or to annotate the result

// 😎 infers correctly to `string`

```

...doesn't exist in TypeScript yet (see this ). This basically means that if you
provide Generic, you have to provide of them. But because React Query has
default values for Generics, we might not notice right away that they will be
taken. The resulting error messages can be quite cryptic. Let's look at an
example where this actually backfires:

```

Copydefault-generics: copy code to clipboard

// 🚨 Type '(groups: Group[]) => number' is not assignable to type '(data:
Group[]) => Group[]'.

// Type 'number' is not assignable to type 'Group[]'.ts(2322)

```

Because we haven't provided the 3rd Generic, the default value kicks in, which
is also , but we return from our function. One fix is to simply add the 3rd
Generic:

```

Copythird-generic: copy code to clipboard

```

As long as we don't have Partial Type Argument Inference, we have to work with
what we got.

Let's start by passing in any Generics at all and let TypeScript figure out what
to do. For this to work, we need the to have a good return type. Of course, if
you inline that function without an explicit return type, you will have -
because that's what or give you:

```

Copyinlined-queryFn: copy code to clipboard

// 🚨 data will be `any` here

```

If you (like me) like to keep your api layer separated from your queries, you'll
need to add type definitions anyways to avoid , so React Query can infer the
rest:

```

Copyinferred-types: copy code to clipboard

// ✅ data will be `Group[] | undefined` here
// ✅ data will be `number | undefined` here

```

Advantages of this approach are:

  * no more manually specifying Generics
  * works for cases where the 3rd (select) and 4th (QueryKey) Generic are needed
  * will continue to work if more Generics are added
  * code is less confusing / looks more like JavaScript

What about error, you might ask? Per default, without any Generics, error will
be inferred to . This might sound like a bug, why is it not ? But it is actually
on purpose, because in JavaScript, you can throw - it doesn't have to be of type
:

```

Copytotally-legit-throw-statements: copy code to clipboard

```

Since React Query is not in charge of the function that returns the Promise, it
also can't know what type of errors it might produce. So is correct. Once
TypeScript allows skipping some generics when calling a function with multiple
generics (see [this issue for more
information](https://tkdodo.eu/blog/<https:/github.com/microsoft/TypeScript/issues/10571>)),
we could handle this better, but for now, if we need to work with errors and
don't want to resort to passing Generics, we can narrow the type with an
instanceof check:

```

Copynarrow-with-instanceof: copy code to clipboard

// 🚨 this doesn't work because: Object is of type 'unknown'.ts(2571)

// ✅ the instanceOf check narrows to type `Error`

```

Since we need to make some kind of check anyways to see if we have an error, the
instanceof check doesn't look like a bad idea at all, and it will also make sure
that our error actually has a property message at runtime. This is also in line
with what TypeScript has planned for the 4.4 release, where they'll introduce a
new compiler flag , where catch variables will be instead of (see ).

I rarely use destructuring when working with React Query. First of all, names
like and are quite universal (purposefully so), so you'll likely rename them
anyway. Keeping the whole object will keep the context of what data it is or
where the error is coming from. It will further help TypeScript to narrow types
when using the status field or one of the status booleans, which it cannot do if
you use destructuring:

```

Copytype-narrowing: copy code to clipboard

// 🚨 data will still be `Group[] | undefined` here
// ✅ groupsQuery.data will now be `Group[]`

```

This has nothing to do with React Query, it is just how TypeScript works. has a
good explanation for this behaviour

[The comment from is exactly right, TypeScript does refinement on the types of
individual symbols. Once you split them apart, it can't keep track of the
relationship any more. Doing this in general would be computationally hard. It
can also be hard for
people.](https://tkdodo.eu/blog/<https:/x.com/danvdk/status/1363614288103964672>)

## Type safety with the enabled option

I've expressed my ♥️ for the right from the start, but it can be a bit tricky on
type level if you want to use it for and disable your query for as long as some
parameters are not yet defined:

```

Copythe-enabled-option: copy code to clipboard

// 🚨 Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
// Type 'undefined' is not assignable to type 'number'.ts(2345)

```

Technically, TypeScript is right, is possibly : the option does not perform any
type narrowing. Also, there are ways to bypass the option, for example by
calling the method returned from . In that case, the might really be .

I've found the best way to go here, if you don't like the , is to accept that
can be and reject the Promise in the . It's a bit of duplication, but it's also
explicit and safe:

```

Copyexplicit-id-check: copy code to clipboard

// ✅ check id at runtime because it can be `undefined`

```

Getting optimistic updates right in TypeScript is not an easy feat, so we've
decided to add it as a comprehensive to the docs.

The important part is: You have to explicitly type the argument passed to in
order to get the best type inference. I don't fully comprehend why that is, but
it again seems to have something to do with inference of Generics. Have a look
for more information.

For the most parts, typing is no different from typing . One noticeable gotcha
is that the value, which is passed to the , is typed as . Could be improved in
the library for sure, but as long as it's , it's probably best to explicitly
annotate it:

```

CopyuseInfiniteQuery: copy code to clipboard

// ⚠️ explicitly type pageParam to override `any`

```

If returns a , will have its type nicely inferred, and we can use the same type
to annotate .

## Typing the default query function

I am personally not using a , but I know many people are. It's a neat way to
leverage the passed to directly build your request url. If you inline the
function when creating the , the type of the passed will also be inferred for
you. TypeScript is just so much better when you inline stuff :)

```

CopydefaultQueryFn: copy code to clipboard

```

This just works, however, is inferred to type , because the whole is an . At the
time of the creation of the queryClient, there is absolutely no guarantee how
the queryKeys will be constructed when calling , so there is only so much React
Query can do. That is just the nature of this highly dynamic feature. It's not a
bad thing though because it means you now have to work defensively and narrow
the type with runtime checks to work with it, for example:

```

Copynarrow-with-typeof: copy code to clipboard

// ✅ narrow the type of url to string

// so that we can work with it

```

I think this shows quite well why is such a great (and underused) type compared
to . It has become my favourite type lately - but that is subject for another
blog post. 😊

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# Using WebSockets with React Query
URL: https://tkdodo.eu/blog/using-web-sockets-with-react-query

# Using WebSockets with React Query

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * **#7: Using WebSockets with React Query**
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[**GenAI apps + MongoDB Atlas** You don't need a separate database to start
building GenAI-powered
apps.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8270/0194f711-1b94-7022-a380-d1dbc76f9fd3/>)

How to handle live data using WebSockets together with React Query has been one
of the most asked questions lately, so I thought I'd give it a try, play around
with it a bit and report my findings. That's what this post is about :)

Simply put, WebSockets allow push messages, or "live data", to be sent from the
server to the client (browser). Usually with HTTP, the client makes a request to
the server, specifying that they would like some data please, the server
responds with that data or an error and then the connection closes.

Since the client is the one opening the connections and initiating the requests,
that leaves no room for the server to push data to the client when the server
knows that an update is available.

Like with any other HTTP request, the browser initiates the connection, but
indicates that they would like to upgrade the connection to a WebSocket. If the
server accepts this, they will then switch the protocol. This connection will
not terminate, but will stay open until either side decides to close it. Now, we
have a fully functioning bi-directional connection open, where both sides can
transmit data.

This has the main advantage that the server can now push selective updates to
the client. This can come in very handy if you have multiple users viewing the
same data, and one user makes an update. Usually, the other clients will not see
that update until they actively refetch. WebSockets allow to instantly push
those updates in real-time.

Since React Query is primarily a client side async state management library, I
will talk about how to set up WebSockets on the server. I've honestly never done
it, and it also depends on which technology you are using in the backend.

React Query doesn't have anything built-in specifically for WebSockets. That
doesn't mean that WebSockets are not supported or that they don't work well with
the library. It's just that React Query is agnostic when it comes to how you
fetch your data: All it needs is a resolved or rejected to work - the rest is up
to you.

The general idea is to setup your queries as usual, as if you wouldn't be
working with WebSockets. Most of the time, you will have your usual HTTP
endpoints to query and mutate entities.

```

Copya-standard-query: copy code to clipboard

```

Additionally, you can setup an app-wide that connects you to your WebSocket
endpoint. How that works totally depends on which technology you are using. I've
seen people subscribe to live data from . There's a great article about
connecting to . In my example, I will simply use the browser's native :

```

CopyuseReactQuerySubscription: copy code to clipboard

```

After we've setup the connection, we will likely have some sort of callback that
will be called when data comes in over the WebSocket. Again, what that data is
depends entirely on how you'd like to set it up. Inspired by from , I like to
send from the backend instead of complete data objects:

```

Copyevent-based-subscriptions: copy code to clipboard

```

That's really all you need to make list and detail views update when you receive
an event.

  * `{ "entity": ["posts", "list"] }` will invalidate the posts list
  * `{ "entity": ["posts", "detail"], id: 5 }` will invalidate a single post
  * will invalidate everything post related

plays really nice together with WebSockets. This approach avoids the problem of
over pushing, because if we receive an event for an entity that we are not
interested in at the moment, nothing will happen. For example, if we are
currently on the page, and we receive an update for , will make sure that the
next time we get to our page, it will be refetched. However, it will not refetch
it right away, because we have no active observers. If we never go to that page
again, the pushed update would be completely unnecessary.

Of course, if you have big data sets that receive small, but frequent updates,
you might still want to push partial data down the WebSocket.

Title of the post has changed? Just push the title. Number of likes have changed
- push it down.

For these partial updates, you can use to directly update the query cache
instead of just invalidating it.

This will be a bit more cumbersome if you have multiple query keys for the same
data, e.g. if you have multiple filter criteria as part of the query key, or if
you want to update list detail view with the same message. is a relatively new
addition to the library that will allow you to tackle this use-case as well:

```

Copypartial-updates: copy code to clipboard

```

It's a bit too dynamic for my taste, doesn't handle addition or deletion, and
TypeScript won't like it very much, so I'd personally rather stick to query
invalidation.

Nevertheless, here is a where I'm handling both type of events: invalidation and
partial updates. (_Note: The custom hook is a bit more convoluted because in the
example, I use the same WebSocket to simulate the server round trip. Don't worry
about it if you have a real server_).

React Query comes with a of . This means that every query will be immediately
considered as stale, which means it will refetch when a new subscriber mounts or
when the user refocuses the window. It is aimed to keep your data as up-to-date
as necessary.

This goal overlaps a lot with WebSockets, which update your data in real-time.
Why would I need to refetch at all if I just manually because the server just
told me to do so via a dedicated message?

So if you update all your data via websockets anyways, consider setting a high .
In my example, I just used . This means the data will be fetched initially via ,
and then always come from the cache. Refetching only happens via the explicit
query invalidation.

You can best achieve this by setting global query defaults when creating the

```

Copyinfinite-stale-time: copy code to clipboard

```

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/effective-react-query-keys

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * **#8: Effective React Query Keys**
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8272/0194f711-2ec1-78d3-b804-f17116a6e46c/>)

are a very important core concept in React Query. They are necessary so that the
library can internally cache your data correctly and refetch automatically when
a dependency to your query changes. Lastly, it will allow you to interact with
the Query Cache manually when needed, for example, when updating data after a
mutation or when you need to manually invalidate some queries.

Let's quickly have a look at what these three points mean before showing you how
I personally organize Query Keys to be able to do these things more effectively.

Internally, the Query Cache is just a JavaScript object, where the keys are
serialized Query Keys and the values are your Query Data plus meta information.
The keys are hashed in a , so you can use objects as well (on the top level,
keys have to be strings or arrays though).

The most important part is that keys need to be for your queries. If React Query
finds an entry for a key in the cache, it will use it. Please also be aware that
you cannot use the same key for . There is, after all, only Query Cache, and you
would share the data between these two. That is not good because infinite
queries have a fundamentally different structure than "normal" queries.

```

// 🚨 this won't work

// ✅ choose something else instead

```

This is a important concept that cannot be emphasized enough, and it's also
something that might take some time to "click". Most people think about queries,
and especially refetching, in an way.

I have a query, it fetches some data. Now I click this button and I want to
refetch, but with different parameters. I've seen many attempts that look like
this:

```

Copyimperative-refetch: copy code to clipboard

// ❓ how do I pass parameters to refetch ❓

```

That's not what is for - it's for refetching .

If you have some that changes your data, all you need to do is to put it in the
Query Key, because React Query will trigger a refetch automatically whenever the
key changes. So when you want to apply your filters, just change your :

```

Copyquery-key-drives-the-query: copy code to clipboard

// ✅ set local state and let it drive the query

```

The re-render triggered by the update will pass a different Query Key to React
Query, which will make it refetch. I have a more in-depth example in [#1:
Practical React Query - Treat the query key like a dependency
array](https://tkdodo.eu/blog/<practical-react-query#treat-the-query-key-like-a-
dependency-array>).

Manual Interactions with the Query Cache are where the structure of your Query
Keys is most important. Many of those interaction methods, like or support ,
which allow you to fuzzily match your Query Keys.

Please note that these points reflect my personal opinion (as everything on this
blog, actually), so don't take it as something that you absolutely must do when
working with Query Keys. I have found these strategies to work best when your
App becomes more complex, and they also scale quite well. You definitely don't
need to do this for a Todo App 😁.

If you haven't yet read by , please do. I don't believe that storing all your
Query Keys globally in will make things better. I keep my Query Keys next to
their respective queries, co-located in a feature directory, so something like:

```

```

The file will contain everything React Query related. I usually only export
custom hooks, so the actual Query Functions as well as Query Keys will stay
local.

Yes, Query Keys can be a string, too, but to keep things unified, I like to
always use Arrays. React Query will internally convert them to an Array anyhow,
so:

```

Copyalways-use-array-keys: copy code to clipboard

// 🚨 will be transformed to ['todos'] anyhow

```

​: With React Query v4, all keys need to be Arrays.

Structure your Query Keys from to , with as many levels of granularity as you
see fit in between. Here's how I would structure a todos list that allows for
filterable lists as well as detail views:

```

['todos', 'list', { filters: 'all' }]

['todos', 'list', { filters: 'done' }]

```

With that structure, I can invalidate everything todo related with , all the
lists or all the details, as well as target one specific list if I know the
exact key. become a lot more flexible with this, because you can target all
lists if necessary:

```

Copyupdates-from-mutation-responses: copy code to clipboard

// ✅ update the todo detail

// ✅ update all the lists that contain this todo

```

This might not work if the structure of lists and details differ a lot, so
alternatively, you can also of course just invalidate all the lists instead:

```

Copyinvalidate-all-lists: copy code to clipboard

// ✅ just invalidate all the lists

```

If you know which list you are currently on, e.g. by reading the filters from
the url, and can therefore construct the exact Query Key, you can also combine
this two methods and call on your list and invalidate all the others:

```

Copycombine: copy code to clipboard

// imagine a custom hook that returns

// the current filters, stored in the url

// ✅ update the list we are currently on

// 🥳 invalidate all the lists,

// but don't refetch the active one

```

​: In v4, has been replaced with . In the above example, that would be , because
we don't want to refetch anything.

In the examples above, you can see that I've been manually declaring the Query
Keys a lot. This is not only error-prone, but it also makes changes harder in
the future, for example, if you find out that you'd like to add level of
granularity to your keys.

That's why I recommend one Query Key factory per feature. It's just a simple
object with entries and functions that will produce query keys, which you can
then use in your custom hooks. For the above example structure, it would look
something like this:

```

Copyquery-key-factory: copy code to clipboard

```

This gives me a lot of flexibility, as each level builds on top of another, but
is still independently accessible:

```

Copyexamples: copy code to clipboard

// 🕺 remove everything related

// to the todos feature

// 🚀 invalidate all the lists

// 🙌 prefetch a single todo

```

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# Leveraging the Query Function Context
URL: https://tkdodo.eu/blog/leveraging-the-query-function-context

# Leveraging the Query Function Context

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * **#8a: Leveraging the Query Function Context**
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8274/0194f711-460f-7a62-b1f9-250d88c1250b/>)

We all strive to improve as engineers, and as time goes by, we hopefully succeed
in that endeavour. Maybe we learn new things that invalidate or challenge our
previous thinking. Or we realise that patterns that we thought ideal would not
scale to the level we now need them to.

Quite some time has passed since I first started to use React Query. I think I
learned a great deal on that journey, and I've also "seen" a lot. I want my blog
to be as up-to-date as possible, so that you can come back here and re-read it,
knowing that the concepts are still valid. This is now more relevant than ever
since agreed to link to my blog from the official .

That's why I've decided to write this addendum to my article. Please make sure
to read it first to have an understanding of what we are talking about.

Don't use inline functions - leverage the Query Function Context given to you,
and use a Query Key factory that produces object keys

Inline functions are by far the easiest way to pass parameters to your , because
they let you closure over other variables available in your custom hook. Let's
look at the evergreen todo example:

```

Copyinline-query-fn: copy code to clipboard

// imagine this grabs the current user selection

// from somewhere, e.g. the url

// ✅ The queryFn is an inline function that

// closures over the passed state

```

Maybe you recognize the example - It's a slight variation of [#1: Practical
React Query - Treat the query key like a dependency
array](https://tkdodo.eu/blog/<practical-react-query#treat-the-query-key-like-a-
dependency-array>). This works great for simple examples, but it has a quite
substantial problem when having lots of parameters. In bigger apps, it's not
unheard of to have lots of filter and sorting options, and I've personally seen
up to 10 params being passed.

Suppose we want to add sorting to our query. I like to approach these things
from the bottom up - starting with the and letting the compiler tell me what I
need to change next:

```

Copysorting-todos: copy code to clipboard

```

This will certainly yield an error in our custom hook, where we call , so let's
fix that:

```

CopyuseTodos-with-sorting: copy code to clipboard

// 🚨 can you spot the mistake ⬇️

```

Maybe you've already spotted the issue: Our got out of sync with our actual
dependencies, and no red squiggly lines are screaming at us about it 😔. In the
above case, you'll likely spot the issue very fast (hopefully via an integration
test), because changing the sorting does not automatically trigger a refetch.
And, let's be honest, it's also pretty obvious in this simple example. I have
however seen the diverge from the actual dependencies a couple of times in the
last months, and with greater complexity, those can result in some hard to track
issues. There's also a reason why React comes with the to avoid that.

So will React Query now come with its own eslint-rule? 👀

Well, that would be one option. There is also the that solves this problem by
generating query keys for you, including all your dependencies. React Query
however comes with a different, built-in way of handling dependencies: The .

The is an object that is passed as argument to the . You've probably used it
before when working with :

```

CopyuseInfiniteQuery: copy code to clipboard

// this is the QueryFunctionContext ⬇️

```

React Query uses that object to inject information about the to the . In case of
, you'll get the return value of injected as .

However, the context also contains the that is used for this query (and we're
about to add more cool things to the context), which means you actually don't
have to closure over things, as they will be provided for you by React Query:

```

Copyquery-function-context: copy code to clipboard

// 🚀 we can get all params from the queryKey

// ✅ no need to pass parameters manually

```

With this approach, you basically have no way of using any additional parameters
in your without also adding them to the . 🎉

## How to type the QueryFunctionContext

One of the ambitions for this approach was to get full type safety and infer the
type of the from the passed to . This wasn't easy, but React Query supports that
since . If you inline the , you'll see that the types are properly inferred
(thank you, Generics):

```

Copyquery-key-type-inference: copy code to clipboard

// ✅ this is safe because the queryKey is a tuple

```

This is nice and all, but still has a bunch of flaws:

  * You can still just use whatever you have in the closure to build your query
  * Using the for building the url in the above way is still unsafe because you can stringify everything.

This is where query key factories come in again. If we have a typesafe query key
factory to build our keys, we can use the return type of that factory to type
our . Here's how that might look:

```

Copytyped-query-function-context: copy code to clipboard

// 🤯 only accept keys that come from the factory

// ✅ build the key via the factory

```

The type is exported by React Query. It takes one generic, which defines the
type of the . In the above example, we set it to be equal to whatever the
function of our key factory returns. Since we use , all our keys will be
strictly typed tuples - so if we try to use a key that doesn't conform to that
structure, we will get a type error.

While slowly transitioning to the above approach, I noticed that array keys are
not really performing that well. This becomes apparent when looking at how we
destruct the query key now:

```

Copyweird-destruct: copy code to clipboard

```

We basically leave out the first two parts (our hardcoded scopes and ) and only
use the dynamic parts. Of course, it didn't take long until we added another
scope at the beginning, which again led to wrongly built urls:

Source: A PR I recently made

Turns out, solve this problem really well, because you can use named
destructuring. Further, they have when used inside a query key, because fuzzy
matching for query invalidation works the same for objects as for arrays. Have a
look at the function if you're interested in how that works.

Keeping that in mind, this is how I would construct my query keys with what I
know today:

```

Copyobject-keys: copy code to clipboard

// ✅ all keys are arrays with exactly one object

// ✅ extract named properties from the queryKey

```

Object query keys even make your fuzzy matching capabilities more powerful,
because they have no order. With the array approach, you can tackle everything
todo related, all todo lists, or the todo list with a specific filter. With
objects keys, you can do that too, but also tackle all lists (e.g. todo lists
and profile lists) if you want to:

```

Copyfuzzy-matching-with-object-keys: copy code to clipboard

// 🕺 remove everything related to the todos feature

// 🚀 reset all todo lists

// 🙌 invalidate all lists across all scopes

```

This can come in quite handy if you have multiple overlapping scopes that have a
hierarchy, but where you still want to match everything belonging to the sub-
scope.

As always: it depends. I've been loving this approach lately (which is why I
wanted to share it with you), but there is certainly a tradeoff here between
complexity and type safety. Composing query keys inside the key factory is
slightly more complex (because still have to be an Array at the top level), and
typing the context depending on the return type of the key factory is also not
trivial. If your team is small, your api interface is slim and / or you're using
plain JavaScript, you might not want to go that route. As per usual, choose
whichever tools and approaches make the most sense for your specific situation.
🙌

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# Placeholder and Initial Data in React Query
URL: https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query

# Placeholder and Initial Data in React Query

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * **#9: Placeholder and Initial Data in React Query**
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8273/0194f711-5cab-7651-844c-b67ea2c9c313/>)

Today's article is all about improving the user experience when working with
React Query. Most of the time, we (and our users) dislike pesky loading
spinners. They are a necessity sometimes, but we still want to avoid them if
possible.

React Query already gives us the tools to get rid of them in many situations. We
get stale data from the cache while background updates are happening, we can if
we know that we need it later, and we can even when our query keys change to
avoid those hard loading states.

Another way is to pre-fill the cache with data that we think will potentially be
right for our use-case, and for that, React Query offers two different yet
similar approaches: and .

Let's start with what they both have in common before exploring their
differences and the situations where one might be better suited than the other.

As already hinted, they both provide a way to pre-fill the cache with data that
we have synchronously available. It further means that if either one of these is
supplied, our query will not be in state, but will go directly to state. Also,
they can both be either a or a function that returns a , for those times when
computing that value is expensive:

```

Copysuccess-queries: copy code to clipboard

// ✅ status will be success even if we have not yet fetched data

// ✅ same goes for initialData

```

Lastly, neither has an effect if you already have data in your cache. So what
difference does it make if I use one or the other? To understand that, we have
to briefly take a look at how (and on which "level") the options in React Query
work:

For each Query Key, there is only one cache entry. This is kinda obvious because
part of what makes React Query great is the possibility to share the same data
"globally" in our application.

Some options we provide to will affect that cache entry, prominent examples are
and . Since there is only cache entry, those options specify how to get data for
that entry, or when it can be garbage collected.

An observer in React Query is, broadly speaking, a subscription created for one
cache entry. The observer watches the cache entry for changes and will be
informed every time something changes.

The basic way to create an observer is to call . Every time we do that, we
create an observer, and our component will re-render when data changes. This of
course means we can have multiple observers watching the same cache entry.

By the way, you can see how many observers a query has by the number on the left
of the Query Key in the React Query Devtools (3 in this example):

Some options that work on observer level would be or . In fact, what makes so
great for is the ability to watch the same cache entry, but subscribe to
different slices of its data in different components.

works on cache level, while works on observer level. This has a couple of
implications:

First of all, is persisted to the cache. It's one way of telling React Query: I
have "good" data for my use-case already, data that is as good as if it were
fetched from the backend. Because it works on cache level, there can only be one
, and that data will be put into the cache as soon as the cache entry is created
(meaning when the first observer mounts). If you try to mount a second observer
with different , it won't do anything.

on the other hand is persisted to the cache. I like to see it as "fake-it-till-
you-make-it" data. It's "not real". React Query gives it to you so that you can
show it while the real data is being fetched. Because it works on observer
level, you can theoretically even have different for different components.

With , you will always get a background refetch when you mount an observer for
the first time. Because the data is "not real", React Query will get the real
data for you. While this is happening, you will also get an flag returned from .
You can use this flag to visually hint to your users that the data they are
seeing is in fact just placeholderData. It will transition back to as soon as
the real data comes in.

on the other hand, because data is seen as good and valid data that we actually
put into our cache, respects . If you have a of zero (which is the default), you
will still see a background refetch.

But if you've set a (e.g. 30 seconds) on your query, React Query will see the
and be like:

> Oh, I'm getting fresh and new data here synchronously, thank you very much,
> now I don't need to go to the backend because this data is good for 30
> seconds.
— React Query when it sees and

If that's not what you want, you can provide to your query. This will tell React
Query when this initialData has been created, and background refetches will be
triggered, taking this into account as well. This is extremely helpful when
using initialData from an existing cache entry by using the available timestamp:

```

CopyinitialDataUpdatedAt: copy code to clipboard

// ✅ will refetch in the background if our list query data

// is older than the provided staleTime (30 seconds)

```

Suppose you provide or , and a background refetch is triggered, which then
fails. What do you think will happen in each situation? I've hidden the answers
so that you can try to come up with them for yourselves if you want before
expanding them.

Since is persisted in the cache, the refetch error is treated like any other
background error. Our query will be in state, but your will still be there.

Since is "fake-it-till-you-make-it" data, and we didn't make it, we won't see
that data anymore. Our query will be in state, and our will be .

As always, that is totally up to you. I personally like to use when pre-filling
a query from another query, and I use for everything else.

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# React Query as a State Manager
URL: https://tkdodo.eu/blog/react-query-as-a-state-manager

# React Query as a State Manager

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * **#10: React Query as a State Manager**
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with MongoDB Atlas, the leading developer data
platform](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8268/0194f711-6fc8-7ab1-933d-11ec014a4138/>)

React Query is loved by many for drastically simplifying data fetching in React
applications. So it might come as a bit of a surprise if I tell you that React
Query is in fact a data fetching library.

It doesn't fetch any data for you, and only a very small set of features are
directly tied to the network (like , or ). This also becomes apparent when you
write your first , and you have to use to actually get the data, like , , or
even .

So if React Query is no data fetching library, what is it?

React Query is an async state manager. It can manage any form of asynchronous
state - it is happy as long as it gets a Promise. Yes, most of the time, we
produce Promises via data fetching, so that's where it shines. But it does more
than just handling loading and error states for you. It is a proper, real,
"global state manager". The uniquely identifies your query, so as long you call
the query with the same key in two different places, they will get the same
data. This can be best abstracted with a custom hook so that we don't have to
access the actual data fetching function twice:

```

Copyasync-state-manager: copy code to clipboard

// ✅ will get exactly the same data as ComponentOne

```

Those components can be in your component tree. As long as they are under the
same , they will get the same data. React Query will also requests that would
happen at the same time, so in the above scenario, even though two components
request the same data, there will be only one network request.

Because React Query manages async state (or, in terms of data fetching: server
state), it assumes that the frontend application doesn't "own" the data. And
that's totally right. If we display data on the screen that we fetch from an
API, we only display a "snapshot" of that data - the version of how it looked
when we retrieved it. So the question we have to ask ourselves is:

Is that data still accurate after we fetch it?

The answer depends totally on our problem domain. If we fetch a Twitter post
with all its likes and comments, it is likely outdated (stale) pretty fast. If
we fetch exchange rates that update on a daily basis, well, our data is going to
be quite accurate for some time even without refetching.

React Query provides the means to our view with the actual data owner - the
backend. And by doing so, it errs on the side of updating often rather than not
updating often enough.

Two approaches to data fetching were pretty common before libraries like React
Query came to the rescue:

  * fetch once, distribute globally, rarely update This is pretty much what I myself have been doing with redux a lot. Somewhere, I dispatch an action that initiates the data fetching, usually on mount of the application. After we get the data, we put it in a global state manager so that we can access it everywhere in our application. After all, many components need access to our Todo list. Do we refetch that data? No, we have "downloaded" it, so we have it already, why should we? Maybe if we fire a POST request to the backend, it will be kind enough to give us the "latest" state back. If you want something more accurate, you can always reload your browser window...
  * fetch on every mount, keep it local Sometimes, we might also think that putting data in global state is "too much". We only need it in this Modal Dialog, so why not fetch it when the Dialog opens. You know the drill: , empty dependency array (throw an eslint-disable at it if it screams), and so on ... Of course, we now show a loading spinner every time the Dialog opens until we have the data. What else can we do, the local state is gone...

Both of these approaches are pretty sub-optimal. The first one doesn't update
our local cache often enough, while the second one potentially re-fetches too
often, and also has a questionable ux because data is not there when we fetch
for the second time.

So how does React Query approach these problems?

You might have heard this before, it's the caching mechanism that React Query
uses. It's nothing new - you can read about the [HTTP Cache-Control Extensions
for Stale Content
here](https://tkdodo.eu/blog/<https:/datatracker.ietf.org/doc/html/rfc5861>). In
summary, it means React Query will cache data for you and give it to you when
you need it, even if that data might not be up-to-date (stale) anymore. The
principle is that stale data is better than no data, because no data usually
means a loading spinner, and this will be perceived as "slow" by users. At the
same time, it will try to perform a background refetch to revalidate that data.

Cache invalidation is pretty hard, so when do you decide it's time to ask the
backend again for new data? Surely we can't just do this every time a component
that calls re-renders. That would be insanely expensive, even by modern
standards.

So React Query is being smart and chooses strategic points for triggering a
refetch. Points that seem to be a good indicator for saying: "Yep, now would be
a good time to go get some data". These are:

  * Whenever a new component that calls mounts, React Query will do a revalidation.
  * Whenever you focus the browser tab, there will be a refetch. This is my favourite point in time to do a revalidation, but it's often misunderstood. During development, we switch browser tabs very often, so we might perceive this as "too much". In production however, it most likely indicates that a user who left our app open in a tab now comes back from checking mails or reading twitter. Showing them the latest updates makes perfect sense in this situation.
  * If you lose your network connection and regain it, it's also a good indicator to revalidate what you see on the screen.

Finally, if you, as the developer of your app, know a good point in time, you
can invoke a manual invalidation via . This comes in very handy after you
perform a mutation.

### Letting React Query do its magic

I love , but as I said before, they are geared towards keeping things up-to-
date, to minimize the amount of network requests. This is mainly because
defaults to , which means that every time you e.g. mount a new component
instance, you will get a background refetch. If you do this a lot, especially
with mounts in short succession that are not in the same render cycle, you might
see of fetches in the network tab. That's because React Query can't deduplicate
in such situations:

```

Copymounts-in-short-succession: copy code to clipboard

// ⚠️ mounts conditionally, only after we already have data

// ⚠️ will thus trigger a second network request

```

> What's going on here, I just fetched my data 2 seconds ago, why is there
> another network request happening? This is insane!
— Legit reaction when using React Query for the first time

At that point, it might seem like a good idea to either pass down via props, or
to put it in to avoid prop drilling, or to just turn off the / flags because all
of this fetching is just too much!

Generally, there is nothing wrong with passing data as props. It's the most
explicit thing you can do, and would work well in the above example. But what if
we tweak the example a bit towards a more real-life situation:

```

Copylazy-second-component: copy code to clipboard

// yes, I leave out error handling, this is "just" an example

   // ✅ show ComponentTwo after the button has been clicked

```

In this example, our second component (which also depends on the todo data) will
only mount after the user clicks a button. Now imagine our user clicks on that
button after some minutes. Wouldn't a background refetch be nice in that
situation, so that we can see the up-to-date values of our todo list?

This wouldn't be possible if you chose any of the aforementioned approaches that
basically bypass what React Query wants to do.

So how can we have our cake and eat it, too?

Maybe you've already guessed the direction in which I want to go: The solution
would be to set to a value you are comfortable with for your specific use-case.
The key thing to know is:

As long as data is fresh, it will always come from the cache only. You will not
see a network request for fresh data, no matter how often you want to retrieve
it.

There is also no "correct" value for . In many situations, the defaults work
really well. Personally, I like to set it to a minimum of 20 seconds to
deduplicate requests in that time frame, but it's totally up to you.

Since v3, React Query supports a great way of setting default values per Query
Key via . So if you follow the patterns I've outlined in [#8: Effective React
Query Keys](https://tkdodo.eu/blog/<effective-react-query-keys>), you can set
defaults for any granularity you want, because passing Query Keys to follows the
standard partial matching that e.g. also have:

```

CopysetQueryDefaults: copy code to clipboard

// ✅ globally default to 20 seconds

// 🚀 everything todo-related will have

// a 1 minute staleTime

```

## A note on separation of concerns

It is a seemingly legit concern that adding hooks like to components of all
layers in your app mixes responsibilities of what a component should do. Back in
the , the "smart-vs-dumb", "container-vs-presentational" component pattern was
ubiquitous. It promised clear separation, decoupling, reusability and ease of
testability because presentational components would just "get props". It also
led to lots of prop drilling, boilerplate, patterns that were hard to statically
type (👋 higher-order-components) and arbitrary component splits.

That changed a lot when hooks came around. You can now , or (if you're using
redux) everywhere, and thus inject dependencies into your component. You can
argue that doing so makes your component more coupled. You can also say that
it's now more independent because you can move it around freely in your app, and
it will just work on its own.

I can totally recommend watching [Hooks, HOCS, and Tradeoffs (⚡️) / React Boston
2019](https://tkdodo.eu/blog/<https:/www.youtube.com/watch?v=xiKMbmDv-Vw>) by
redux maintainer .

In summary, it's all tradeoffs. There is no free lunch. What might work in one
situation might not work in others. Should a reusable component do data
fetching? Probably not. Does it make sense to split your into a and a that
passes data down? Also, probably not. So it's on us to know the tradeoffs and
apply the right tool for the right job.

React Query is great at managing async state globally in your app, if you let
it. Only turn off the refetch flags if you know that make sense for your use-
case, and resist the urge to sync server data to a different state manager.
Usually, customizing is all you need to get a great ux while also being in
control of how often background updates happen.

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/react-query-error-handling

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * **#11: React Query Error Handling**
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8273/0194f711-8542-7fd2-84a1-299b66d85a08/>)

Handling errors is an integral part of working with asynchronous data,
especially data fetching. We have to face it: Not all requests will be
successful, and not all Promises will be fulfilled.

Oftentimes, it is something that we don't focus on right from the beginning
though. We like to handle "sunshine cases" first where error handling becomes an
afterthought.

However, not thinking about how we are going to handle our errors might
negatively affect user experience. To avoid that, let's dive into what options
React Query offers us when it comes to error handling.

React Query needs a rejected Promise in order to handle errors correctly.
Luckily, this is exactly what you'll get when you work with libraries like .

If you are working with or other libraries that give you a rejected Promise on
erroneous status codes like 4xx or 5xx, you'll have to do the transformation
yourself in the . This is covered in .

Let's see how most examples around displaying errors look like:

```

Copythe-standard-example: copy code to clipboard

// ✅ standard error handling

// could also check for: todos.status === 'error'

```

Here, we're handling error situations by checking for the boolean flag (which is
derived from the enum) given to us by React Query.

This is certainly okay for some scenarios, but has a couple of drawbacks, too:

  1. It doesn't handle background errors very well: Would we really want to unmount our complete Todo List just because a background refetch failed? Maybe the api is temporarily down, or we reached a rate limit, in which case it might work again in a few minutes. You can have a look at [#4: Status Checks in React Query](https://tkdodo.eu/blog/<status-checks-in-react-query>) to find out how to improve that situation.
  2. It can become quite boilerplate-y if you have to do this in every component that wants to use a query.

To solve the second issue, we can use a great feature provided directly by React
itself:

are a general concept in React to catch runtime errors that happen during
rendering, which allows us to react (pun intended) properly to them and display
a fallback UI instead.

This is nice because we can wrap our components in Error Boundaries at any
granularity we want, so that the rest of the UI will be unaffected by that
error.

One thing that Error Boundaries do is catch asynchronous errors, because those
do not occur during rendering. So to make Error Boundaries work in React Query,
the library internally catches the error for you and re-throws it in the next
render cycle so that the Error Boundary can pick it up.

I think this is a pretty genius yet simple approach to error handling, and all
you need to do to make that work is pass the flag to your query (or provide it
via a default config):

```

CopythrowOnError: copy code to clipboard

// ✅ will propagate all fetching errors

// to the nearest Error Boundary

```

Starting with , you can even customize which errors should go towards an Error
Boundary, and which ones you'd rather handle locally by providing a function to
:

```

Copygranular-error-boundaries: copy code to clipboard

// 🚀 only server errors will go to the Error Boundary

```

This also works for , and is quite helpful for when you're doing form
submissions. Errors in the 4xx range can be handled locally (e.g. if some
backend validation failed), while all 5xx server errors can be propagated to the
Error Boundary.

For some use-cases, it might be better to show error toast notifications that
pop up somewhere (and disappear automatically) instead of rendering Alert
banners on the screen. These are usually opened with an imperative api, like the
one offered by :

```

Copyreact-hot-toast: copy code to clipboard

```

So how can we do this when getting an error from React Query?

```

Copythe-onError-callback: copy code to clipboard

// ⚠️ looks good, but is maybe _not_ what you want

```

At first glance, it looks like the callback is exactly what we need to perform a
side effect if a fetch fails, and it will also work - for as long as we only use
the custom hook once!

You see, the callback on is called for every , which means if you call twice in
your application, you will get two error toasts, even though only one network
request fails.

Conceptually, you can imagine that the onError callback functions similar to a .
So if we expand the above example to that syntax, it will become more apparent
that this will run for every consumer:

```

CopyuseEffect-error-toast: copy code to clipboard

// 🚨 effects are executed for every component

// that uses this custom hook individually

```

Of course, if you don't add the callback to your custom hook, but to the
invocation of the hook, this is totally fine. But what if we don't really want
to notify all Observers that our fetch failed, but just notify the user that the
underlying fetch failed? For that, React Query has callbacks on a different
level:

The global callbacks need to be provided when you create the , which happens
implicitly when you create a , but you can also customize that:

```

Copyquery-cache-callbacks: copy code to clipboard

```

This will now only show an error toast once for each query, which exactly what
we want.🥳 It is also likely the best place to put any sort of error tracking or
monitoring that you want to perform, because it's guaranteed to run only once
per request and be overwritten like e.g. the defaultOptions.

The three main ways to handle errors in React Query are:

  * the callback (on the query itself or the global QueryCache / MutationCache)

You can mix and match them however you want, and what I personally like to do is
show error toasts for background refetches (to keep the stale UI intact) and
handle everything else locally or with Error Boundaries:

```

Copybackground-error-toasts: copy code to clipboard

// 🎉 only show error toasts if we already have data in the cache

// which indicates a failed background update

```

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# Mastering Mutations in React Query
URL: https://tkdodo.eu/blog/mastering-mutations-in-react-query

# Mastering Mutations in React Query

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * **#12: Mastering Mutations in React Query**
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8273/0194f711-9937-7413-93b2-c363e5e7b72a/>)

We've covered a lot of ground already when it comes to the features and concepts
React Query provides. Most of them are about data - via the hook. There is
however a second, integral part to working with data: updating it.

For this use-case, React Query offers the hook.

Generally speaking, mutations are functions that have a side effect. As an
example, have a look at the method of Arrays: It has the side effect of the
array in place where you're pushing a value to:

```

Copymutable-array-push: copy code to clipboard

```

The counterpart would be , which can also add values to an array, but it will
return a new Array instead of directly manipulating the Array you operate on:

```

Copyimmutable-array-concat: copy code to clipboard

```

As the name indicates, also has some sort of side effect. Since we are in the
context of with React Query, mutations describe a function that performs such a
side effect . Creating a todo in your database would be a mutation. Logging in a
user is also a classic mutation, because it performs the side effect of creating
a token for the user.

In some aspects, is very similar to . In others, it is quite different.

will track the state of a mutation, just like does for queries. It'll give you ,
and fields to make it easy for you to display what's going on to your users.

You'll also get the same nice callbacks that has: , and . But that's about where
the similarities end.

useQuery is declarative, useMutation is imperative.

By that, I mean that queries mostly run automatically. You define the
dependencies, but React Query takes care of running the query immediately, and
then also performs smart background updates when deemed necessary. That works
great for queries because we want to keep what we see on the screen with the
actual data on the backend.

For mutations, that wouldn't work well. Imagine a new todo would be created
every time you focus your browser window 🤨. So instead of running the mutation
instantly, React Query gives you a function that you can invoke whenever you
want to make the mutation:

```

Copyimperative-mutate: copy code to clipboard

// this doesn't really do anything yet

// ✅ mutation is invoked when the form is submitted

```

Another difference is that mutations don't share state like does. You can invoke
the same call multiple times in different components and will get the same,
cached result returned to you - but this won't work for mutations.

Mutations are, per design, not directly coupled to queries. A mutation that
likes a blog post has no ties towards the query that fetches that blog post. For
that to work, you would need some sort of underlying schema, which React Query
doesn't have.

To have a mutation reflect the changes it made on our queries, React Query
primarily offers two ways:

This is conceptually the simplest way to get your screen up-to-date. Remember,
with server state, you're only ever displaying a snapshot of data from a given
point in time. React Query tries to keep that up-to-date of course, but if
you're deliberately changing server state with a mutation, this is a great point
in time to tell React Query that some data you have cached is now "invalid".
React Query will then go and refetch that data if it's currently in use, and
your screen will update automatically for you once the fetch is completed. The
only thing you have to tell the library is queries you want to invalidate:

```

Copyinvalidation-from-mutation: copy code to clipboard

// ✅ refetch the comments list for our blog post

```

Query invalidation is pretty smart. Like all , it uses fuzzy matching on the
query key. So if you have multiple keys for your comments list, they will all be
invalidated. However, only the ones that are currently active will be refetched.
The rest will be marked as stale, which will cause them to be refetched the next
time they are used.

As an example, let's assume we have the option to sort our comments, and at the
time the new comment was added, we have two queries with comments in our cache:

```

['posts', 5, 'comments', { sortBy: ['date', 'asc'] }

['posts', 5, 'comments', { sortBy: ['author', 'desc'] }

```

Since we're only displaying one of them on the screen, will refetch that one and
mark the other one as stale.

Sometimes, you don't want to refetch data, especially if the mutation already
returns everything you need to know. If you have a mutation that updates the
title of your blog post, and the backend returns the complete blog post as a
response, you can update the query cache directly via :

```

Copyupdate-from-mutation-response: copy code to clipboard

// 💡 response of the mutation is passed to onSuccess

// ✅ update detail view directly

```

Putting data into the cache directly via will act as if this data was returned
from the backend, which means that all components using that query will re-
render accordingly.

I'm showing some more examples of direct updates and the combination of both
approaches in [#8: Effective React Query
Keys](https://tkdodo.eu/blog/<effective-react-query-keys#structure>).

I personally think that most of the time, invalidation should be preferred. Of
course, it depends on the use-case, but for direct updates to work reliably, you
need more code on the frontend, and to some extent duplicate logic from the
backend. Sorted lists are for example pretty hard to update directly, as the
position of my entry could've potentially changed because of the update.
Invalidating the whole list is the "safer" approach.

Optimistic updates are one of the key selling points for using React Query
mutations. The cache gives us data instantly when switching between queries,
especially when combined with . Our whole UI feels very snappy because of it, so
why not get the same advantage for mutations as well?

A lot of the time, we are quite certain that an update will go through. Why
should the user wait for a couple of seconds until we get the okay from the
backend to show the result in the UI? The idea of optimistic updates is to fake
the success of a mutation even before we have sent it to the server. Once we get
a successful response back, all we have to do is invalidate our view again to
see the real data. In case the request fails, we're going to roll back our UI to
the state from before the mutation.

This works great for small mutations where instant user feedback is actually
required. There is nothing worse than having a toggle button that performs a
request, and it doesn't react at all until the request has completed. Users will
double or even triple click that button, and it will just feel "laggy" all over
the place.

I've decided to show an additional example. The cover that topic very well, and
they also have a codesandbox example .

I further think that optimistic updates are a bit over-used. Not every mutation
needs to be done optimistically. You should really be sure that it rarely fails,
because the UX for a rollback is not great. Imagine a Form in a Dialog that
closes when you submit it, or a redirect from a detail view to a list view after
an update. If those are done prematurely, they are hard to undo.

Also, be sure that the instant feedback is really required (like in the toggle
button example above). The code needed to make optimistic updates work is non-
trivial, especially compared to "standard" mutations. You need to mimic what the
backend is doing when you're faking the result, which can be as easy as flipping
a Boolean or adding an item to an Array, but it might also get more complex
really fast:

  * If the todo you're adding needs an id, where do you get it from?
  * If the list you're currently viewing is sorted, will you insert the new entry at the right position?
  * What if another user has added something else in the meantime - will our optimistically added entry switch positions after a refetch?

All these edge cases might make the UX actually worse in some situations, where
it might be enough to disable the button and show a loading animation while the
mutation is in-flight. As always, choose the right tool for the right job.

Finally, let's dive into some things that are good to know when dealing with
mutations that might not be that obvious initially:

Promises returned from the mutation callbacks are awaited by React Query, and as
it so happens, returns a Promise. If you want your mutation to stay in state
while your related queries update, you have to return the result of from the
callback:

```

Copyawaited-promises: copy code to clipboard

// 🎉 will wait for query invalidation to finish

// 🚀 fire and forget - will not wait

```

gives you two functions - and . What's the difference, and when should you use
which one?

doesn't return anything, while returns a Promise containing the result of the
mutation. So you might be tempted to use when you need access to the mutation
response, but I would still argue that you should almost always use .

You can still get access to the or the via the callbacks, and you don't have to
worry about error handling: Since gives you control over the Promise, you also
have to catch errors manually, or you might get an .

```

Copyaccessing-mutation-data: copy code to clipboard

// ✅ accessing the response via onSuccess

// 🚨 works, but is missing error handling

// 😕 this is okay, but look at the verbosity

```

Handling errors is not necessary with , because React Query catches (and
discards) the error for you internally. It is literally implemented with: 😎

The only situations where I've found to be superior is when you really need the
Promise for the sake of having a Promise. This can be necessary if you want to
fire off multiple mutations concurrently and want to wait for them all to be
finished, or if you have dependent mutations where you'd get into callback hell
with the callbacks.

### Mutations only take one argument for variables

Since the last argument to is the options object, can currently only take
argument for variables. This is certainly a limitation, but it can be easily
worked around by using an object:

```

Copymultiple-variables: copy code to clipboard

// 🚨 this is invalid syntax and will NOT work

// ✅ use an object for multiple variables

```

To read more on why that is currently necessary, have a look at .

### Some callbacks might not fire

You can have callbacks on as well as on itself. It is important to know that the
callbacks on fire before the callbacks on . Further, the callbacks on might not
fire if the component unmounts before the mutation has finished.

That's why I think it's a good practice to separate concerns in your callbacks:

  * Do things that are absolutely necessary and logic related (like query invalidation) in the callbacks.
  * Do UI related things like redirects or showing toast notifications in callbacks. If the user navigated away from the current screen before the mutation finished, those will purposefully not fire.

This separation is especially neat if comes from a custom hook, as this will
keep query related logic in the custom hook while UI related actions are still
in the UI. This also makes the custom hook more reusable, because how you
interact with the UI might vary on a case by case basis - but the invalidation
logic will likely always be the same:

```

Copyseparate-concerns: copy code to clipboard

// ✅ always invalidate the todo list

// ✅ only redirect if we're still on the detail page

// when the mutation finishes

```

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/offline-react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[An easy, simple SMS API. ClickSend is made for
developers.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8204/0194f711-b0c5-7352-991d-d4b69825b93e/>)

I've said it time and time again - React Query is an . As long as you give it a
Promise, resolved or rejected, the library is happy. Doesn't matter where that
Promise comes from.

There are many ways to produce promises, but by far the biggest use-case is data
fetching. Very often, that requires an active network connection. But sometimes,
especially on mobile devices where the network connection can be unreliable, you
need your app to also work without it.

React Query is very well-equipped to handle offline scenarios. Because it
provides a caching layer, as long as the cache is filled, you can keep working
even if you don't have a network connection. Let's look at a couple of edge-case
scenarios where v3 will not work as expected. I will use our basic post list /
post detail for illustration:

### 1) no data in the cache

As I said, in v3, things work well as long as the cache is filled. An edge case
scenario where things get weird would be the following:

  * You have a good network connection and navigate to the list view
  * You lose connection and click on a post.

What happens is that your query will stay in state until you regain connection.
Also, you can see a failed network request in the browser devtools. That is
because React Query will always fire off the first request, and if that fails,
it will pause retries if you have no network connection.

Further, the React Query Devtools will show that your query is , which is not
entirely true. The query is actually , but we have no concept to represent that
state - it's a hidden implementation detail.

Similarly, if you have turned off retries altogether in the above scenario, your
query will go to error state immediately, with no way of stopping that.

Why do I need for my query to if I have no network connection 🤷‍♂️?

### 3) queries that don't need the network

Queries that don't need a network connection to work (e.g. because they do an
expensive async processing in a web worker) will be paused until you regain
network connection if they fail for some other reason. Also, those queries won't
run on window focus because that feature is completely disabled if you have no
network connection.

In summary, there are two major issues: In some cases, React Query assumes that
network connection is needed when that might not be true (case 3), and in other
cases, React Query fires off a query even though it probably shouldn't (cases 1
and 2).

In v4, we've tried to tackle this problem holistically with a new setting. With
this, we can clearly distinguish between and queries. It is an option for as
well as , which means you can set it globally or on a per-query basis. After
all, you might have some queries that need network connection, and some that
don't.

This is the new default mode in v4, as we expect most users to use React Query
in combination with data fetching. In short, with this setting, we assume that a
query can only run if it has an active network connection.

So what happens if you want to run a query that needs network connection when
you don't have one? The query will go to a new state. That state is secondary to
the main state that the query can be in: , or , because you can lose your
network connection at any time.

This means you can be in state and , for example, if you've fetched data
successfully once but a background refetch got paused.

Or, you can be in state and if a query mounts for the first time.

We've always had the flag that indicated that a query was running. Similar to
the new state, a query could be and , or it could be and . Background refetches
give you a of possible states to be in (👋 state machines).

As and are mutually exclusive, we've combined them into the new that now gets
returned from :

  * : The query is really executing - a request is in-flight.
  * : The query is not executing - it is paused until you have regained your connection.
  * : The query is currently not running.

As a rule of thumb, the of the query will give you information about the : means
you'll always have data, means you don't have data yet.

On the other hand, the gives you information about the : is it running or not?
The and flags are derived from that status.

Let's take a look at how from above can look like in v4. Please notice the new
network mode toggle button in the RQ devtools. It's pretty cool because it
doesn't actually turn off your network - it just makes React Query that there is
no network for testing purposes. Yes, I am quite proud of it. 😊

We can clearly see the state the query is in () due to the new purple status
badge. Also, the first network request is made once we turn the network back on.

In this mode, React Query does not care about your network connection at all.
Queries will always fire, and they will never be paused. This is most useful if
you use React Query for something data fetching.

This mode is very similar to how React Query worked in v3. The first request
will be made, and if that fails, retries will be paused. This mode is useful if
you're using an additional caching layer like the browser cache on top of React
Query.

Let's take the GitHub repo API as an example. It sends the following response
headers:

```

```

which means that for the next 60 seconds, if you request that resource again,
the response will come from the browser cache. The neat thing about this is that
it works while you're offline, too! Service workers, e.g. for , work in a
similar way by intercepting the network request and delivering cached responses
if they are available.

Now those things wouldn't work if React Query would decide to fire the request
because you have no network connection, like the default mode does. To intercept
a fetch request, it must happen :) So if you have this additional cache layer,
make sure to use .

If the first request goes out, and you hit the cache - great, your query will go
to state, and you'll get that data. And if you have a cache miss, you'll likely
get a network error, after which React Query will pause the retries, which will
put your query into the state. It's the best of both worlds. 🙌

## What does all of this mean for me, exactly?

Nothing, unless you want to. You can still decide to ignore that new and only
check for - React Query will behave just like before (well - from above will
even work better because you won't see the network error).

However, if making your app robust for situations where you have no network
connection is a priority for you, you now have the option to react to the
exposed and act accordingly.

What you do with that new status is up to you. I'm excited to see which ux
people will build on top of this. 🚀

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/react-query-and-forms

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * **#14: React Query and Forms**
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[video to see firsthand how to upgrade your site with end-to-end AI
Search.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8298/0194f711-c3b3-7531-aefa-2c14586550a5/>)

Forms are an important part in many web applications as the primary means to
update data. We are using React Query not only to fetch data (), but also to
modify it (), so we need to somehow integrate our beloved async state manager
with forms.

The good news is that realistically, there isn't anything special about forms:
It is still just a bunch of html elements that we render in order to display
some data. However, as we'd also like to that data, the lines between what is
Server State and what is Client State start to blur a bit, which is where the
complexity might come in.

## Server State vs. Client State

To recap, is state that we do not own, that is mostly async and where we only
see a snapshot of how the data looked like the last time we fetched it.

is state that the frontend has full control over, is mostly synchronous and
where we know the accurate value of it at all times.

When we display a list of Persons, that is undoubtedly Server State. But what
happens when we click on a Person to show their details in a Form with the
intention of maybe updating some values? Does that Server State now become
Client State? Is it a hybrid?

I have gone on the record already about how I am not a fan of copying state from
one state manager to another, be it or copying state from [React Query to local
state](https://tkdodo.eu/blog/<practical-react-query#keep-server-and-client-
state-separate>).

I do think that forms can be an exception to this rule though, if you are doing
it deliberately and know about the tradeoffs (everything is a tradeoff after
all). When rendering our Person form, we very likely want to treat the Server
State as data only. We fetch the firstName and lastName, put it into the form
state, and then let the user update it.

Let's take a look at an example:

```

Copysimple-form: copy code to clipboard

```

This works incredibly well - so what are those tradeoffs?

You might know that would also take defaultValues directly for the whole form,
which would be pretty nice for larger forms. However, because we cannot call
hooks conditionally, and because our is on the first render cycle (as we need to
fetch it first), we cannot just do this in the same component:

```

Copyno-default-values: copy code to clipboard

// 🚨 this will initialize our form with undefined

```

We'd have the same problem when copying into , or when using uncontrolled forms
(which react-hook-form does under the hood by the way). The best solution to
this would be to split up the form into its own component:

```

Copyseparate-form: copy code to clipboard

```

This is not too bad, as it separates our data fetching from the presentation.
I'm personally not a big fan of such a split, but it does get the job done here.

React Query is all about keeping your UI up-to-date with Server State. As soon
as we copy that state somewhere else, React Query cannot do its job anymore. if
a background refetch happens for whatever reason, and it yields new data, our
form state will not update with it. This is likely not problematic if we are the
only one working on that form state (like a form for our profile page). If
that's the case, we should likely at least disable background updates by setting
a higher on our query. After all, why would we keep querying our server if the
updates will not be reflected on the screen?

```

Copyno-background-updates: copy code to clipboard

// ✅ opt out of background updates

```

This approach can get problematic on bigger forms and in collaborative
environments. The bigger the form, the longer it takes our users to fill it out.
If multiple people work on the same form, but on different fields, whoever
updates last might override the values that others have changed, because they
still see a partially outdated version on their screen.

Now react hook form allows you to detect which fields have been changed by the
user and only send "dirty" fields to the server with some user land code (see ),
which is pretty cool. However, this still doesn't show the latest values with
updates made by other users to you. Maybe you would change your input had you
known that a certain field was changed in the meantime by someone else.

So what would we need to do to still reflect background updates while we are
editing our form?

One approach is to rigorously separate the states. We'll keep the Server State
in React Query, and only track the changes the user has made with our Client
State. The source of truth that we display then to our users is from those two:
If the user has changed a field, we show the Client State. If not, we fall back
to the Server State:

```

Copyseparate-states: copy code to clipboard

// ✅ derive state from field value (client state)

// and data (server state)

```

With that approach, we can keep background updates on, because it will still be
relevant for untouched fields. We are no longer bound to the initialState that
we had when we first rendered the form. As always, there are caveats here as
well:

As far as I'm aware, there is no good way to achieve this with uncontrolled
fields, which is why I've resorted to using controlled fields in the above
example. Please let me know if I'm missing something.

### Deriving state might be difficult

This approach works best for shallow forms, where you can easily fall back to
the Server State using nullish coalesce, but it could be more difficult to merge
properly with nested objects. It might also sometimes be a questionable user
experience to just change form values in the background. A better idea might be
to just highlight values that are out of sync with the Server State and let the
user decide what to do.

Whichever way you choose, try to be aware of the advantages / disadvantages that
each approach brings.

Apart from those two principal ways of setting up your form, here are some
smaller, but nonetheless important tricks to integrate React Query with forms:

To prevent a form from being submitted twice, you can use the prop returned from
, as it will be true for as long as our mutation is running. To disable the form
itself, all you need to do is to disable the primary submit button:

```

Copydisabled-submit: copy code to clipboard

```

### Invalidate and reset after mutation

If you do not redirect to a different page right after the form submission, it
might be a good idea to reset the form the invalidation has completed. As
described in , you'd likely want to do that in the callback of . This also works
best if you keep state seperated, as you only need to reset to in order for the
server state to be picked up again:

```

Copyreset-form: copy code to clipboard

// ✅ return Promise from invalidation

// so that it will be awaited

// ✅ reset client state back to undefined

```

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/react-query-fa-qs

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with MongoDB Atlas, the leading developer data
platform](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8268/0194f711-d91a-79c2-bd96-5f2504810472/>)

I have been answering of questions over the last 18 months regarding React
Query. Being involved in the community and answering questions was what got me
into open-source in the first place, and it was also a big factor for writing
this React Query related series of articles.

I'm still excited to answer questions, especially if they are well formulated
and of the non-standard kind. Please see my post if you don't know what I mean
or want to know what makes a question a good question.

However, I have also seen a couple of repetitive questions that are mostly
straight-forward for me to answer, but still require a bit of effort to get into
writing. That's what this article is mainly about: To give myself yet another
resource to point people towards when I see those questions again.

Without further ado, here are the top questions and my two cents on them:

## How can I pass parameters to refetch?

The short answer is still: you cannot. But there's a very good reason for that.
Every time you that's what you want, you usually don't.

Mostly, code that wants to refetch with parameters looks something like this:

```

Copyrefetch-with-parameters: copy code to clipboard

// 🚨 this is not how it works

```

Parameters or Variables are dependencies to your query. In the above code, we
define a QueryKey , so whatever we fetch will be stored under that key. If we
were to refetch with a id, it would still write to the same place in the cache,
because the key stays the same. So id 2 would then overwrite data for id 1. If
you were to switch back to id 1, that data would be gone.

Caching different responses under different query keys is one of React Query's
greatest strengths. The hypothetical "refetch-with-parameters" api would take
that feature away. This is why is only meant to replay the request with the same
variables. So in essence, you don't really want a : You want a for a different
id!

To use React Query effectively, you have to embrace the declarative approach:
The query key defines all dependencies that the query function needs to fetch
data. If you stick to that, all you have to do to get refetches is to update the
dependency. A more realistic example would look like this:

```

Copydynamic-query-key: copy code to clipboard

// ✅ set id without explicitly refetching

```

will re-render the component, React Query will pick up the new key and start
fetching for that key. It will also cache it separately from id 1.

The declarative approach also makes sure that no matter where or how you update
the id, your query data will always be "in sync" with it. So your thinking goes
from: "If I click that button, I want to refetch" towards: "I always want to see
data for the current id".

You also don't have to store that id in - it can be done in any way to store
client side state (, , ...). In the above example, the URL would be a good place
to store the id, too:

```

Copyurl-state: copy code to clipboard

// ✅ change url, make useParams pick it up

```

The best part about this approach is that you don't have to manage state, that
you get sharable urls and that the browser back button will also just work for
your users to navigate between items.

You might notice that switching query keys will put your query into hard loading
state again. That is expected, because we change keys and there is no data for
that key yet.

There are a bunch of ways to ease the transition, like setting a for that key or
data for the new key ahead of time. A nice approach to tackle this problem is to
instruct the query to keep previous data:

```

Copykeep-previous-data: copy code to clipboard

```

With this setting, React Query will still show data for id 1 while data for id 2
is being fetched. Additionally, the flag on the query result will be set to
true, so that you can act accordingly in the UI. Maybe you want to show a
background loading spinner in addition to the data, or you'd like to add opacity
to the shown data, indicating that it's stale. That is totally up to you - React
Query just gives you the means to do that. 🙌

## Why are updates not shown?

When interacting with the Query Cache directly, be that because you want to
perform an [update from a mutation
response](https://tkdodo.eu/blog/<https:/react-
query.tanstack.com/guides/updates-from-mutation-responses>) or because you want
to , I sometimes get reports that the updates are not reflected on the screen,
or that it simply "doesn't work". If that's the case, it mostly boils down to
one of two issues:

### 1: Query Keys are not matching

Query Keys are hashed deterministically, so you don't have to keep referential
stability or object key order in mind. However, when you call , the key must
still match the existing key fully. As an example, those two keys do not match:

```

Copynon-matching-keys: copy code to clipboard

```

The second value of the key array is a in the first example and a in the second.
This can happen if you usually work with numbers, but get a string if you read
from the URL with .

The React Query Devtools are your best friend in this case, as you can clearly
see which keys exist and which keys are currently fetching. Keep an eye on those
pesky details though!

I recommend using and to help with that problem.

### 2: The QueryClient is not stable

In most examples, we create the queryClient the component, which makes it
referentially stable:

```

Copystandard-example: copy code to clipboard

// ✅ created outside of the App

```

The holds the , so if you create a new client, you also get a new cache, which
will be empty. If you move the client creation into the component, and your
component re-renders for some other reason (e.g. a route change), your cache
will be thrown away:

```

Copyunstable-query-client: copy code to clipboard

// 🚨 this is not good

```

If you have to create your client inside the , make sure that it is
referentially stable by using an instance ref or React state:

```

Copystable-query-client: copy code to clipboard

// ✅ this is stable

```

I do have a separate blog post on that topic: .

... if I can just as well import the client?

The puts the created into React Context to distribute it throughout your app.
You can best read it with . This does not create any extra subscriptions and
will not cause any additional re-renders (if the client is stable - see above) -
it just avoids having to pass the client down as a prop.

Alternatively, you could export the client and just import it wherever you need
to:

```

Copyexported-query-client: copy code to clipboard

// ⬇️ exported so that we can import it

```

Here are a couple of reasons why using the hook is preferred:

### 1: useQuery uses the hook too

When you call , we call under the hood. This will look up the nearest client in
React Context. Not a big deal, but if you ever get into the situation where the
client you import is different from the one in context you'll have a hard to
trace bug that could be avoided.

### 2: It decouples your app from the client

The client you define in your is your production client. It might have some
default settings that work well in production. However, in testing, it might
make sense to use different default values. One example is during testing,
because testing erroneous queries might time out the test otherwise.

A big advantage of React Context when used as a dependency injection mechanism
is that it decouples your app from its dependencies. just expects any client to
be in the tree above - not a specific client. You'll lose that advantage if you
import the production client directly.

### 3: You sometimes can't export

It is sometimes necessary to create the inside the App component (as shown
above). One example is when using server side rendering, because you want to
avoid having multiple users share the same client.

The same is true when you work with microfrontends - Apps should be isolated. If
you create the client outside the App, then use the same App twice on the same
page, they'll share a client.

Lastly, if you want to use other hooks in the default values of the , you also
need to create it inside the App. Consider a global error handler that wants to
show a toast for every failing mutation:

```

Copyuse-other-hooks: copy code to clipboard

// ✅ we couldn't useToast outside of the App

// ⬇️ but we need it here

```

So if you create your like that, there is no way that you can just export it and
import it in your App.

My best guess on why you would want to export the client is if you're working
with a legacy class component that needs to do some query invalidation - and you
can't use hooks there. If that is the case, and you can't refactor to a
functional component easily, consider creating a render props version:

```

CopyuseQueryClient-render-props: copy code to clipboard

```

```

Copyusage: copy code to clipboard

```

And by the way, you can do the same thing for useQuery, or any other hook for
that matter:

```

CopyuseQuery-render-props: copy code to clipboard

```

```

Copyusage: copy code to clipboard

// 🙌 return jsx here

```

## Why do I not get errors ?

If your network request fails, you'd ideally want your query to go to the state.
If that doesn't happen, and you still see a successful query instead, that means
that your did not return a failed Promise.

Remember: React Query doesn't know (or care) about status codes or network
requests at all. It needs a resolved or rejected Promise that the needs to
provide.

If React Query sees a rejected Promise, it can potentially start retries, pause
queries if you are offline and eventually put the query into the error state, so
it's quite an important thing to get right.

Luckily, many data fetching libraries like or transform erroneous status codes
like 4xx or 5xx into failed Promises, so if your network request fails, your
query fails too. The notable exception is the built-in , which will only give
you a failed Promise if the request failed due to a network error.

This is of course , but it's still a stumbling block if you've missed this.

```

Copywrong-fetch-api-example: copy code to clipboard

// 🚨 4xx or 5xx are not treated as errors

```

To overcome this, you need to check if the response was and transform it into a
rejected Promise if it wasn't:

```

Copycorrect-fetch-api-example: copy code to clipboard

// ✅ transforms 4xx and 5xx into failed Promises

'Network response was not ok'

```

The second reason I've seen a lot is that errors are caught inside the for
logging purposes. If you do that without re-throwing the error, you will again
return a successful Promise implicitly:

```

Copywrong-logging-example: copy code to clipboard

// 🚨 here, an "empty" Promise<void> is returned

```

If you want to do this, remember to re-throw the error:

```

Copycorrect-logging-example: copy code to clipboard

// ✅ here, a failed Promise is returned

```

An alternative and not so verbose way to handle errors is to use the callback of
the QueryCache. You can read more about different ways to handle errors in [#11:
React Query Error Handling](https://tkdodo.eu/blog/<react-query-error-
handling>).

From time to time, I get bug reports that the isn't called even though it should
be. When that happens, the most likely reason is the use of together with :

```

CopyinitialData-and-staleTime: copy code to clipboard

```

The thing is that is taken into account whenever a new cache entry is created,
and that data is put into the cache. Once data is in the cache, React Query
doesn't care (and actually doesn't know) where it came from. Could be from the ,
could be because you called manually, or because of .

Combined with the setting, that will now be seen as for the next 5 seconds. So
the "mount" of this instance will trigger a background refetch. Why should it -
we have fresh data (an empty array) in the cache. This is especially tricky to
see if is applied globally, and not itself.

The key takeaway here is that should only be used if you have "real" data
synchronously available - data that you'd happily cache for your users. The
empty array is probably more of a "fallback" that you'd like to show until real
data has been fetched. For that use-case, is better:

```

CopyplaceholderData-and-staleTime: copy code to clipboard

```

Since is never cached, you'll always get a background refetch. You can read more
about the differences between and .

Another fix (more of a workaround really) is to specify that your is from the
beginning. Per default, React Query uses when it puts into the cache. However,
we can customize this with . I found that setting this to (or any time in the
past really) works well to trigger a background update, too:

```

CopyinitialDataUpdatedAt: copy code to clipboard

```

Another situation where this behaviour is hard to spot is when dynamic Query
Keys are used, e.g. for paginated queries:

```

Copypaginated-queries: copy code to clipboard

```

You might've wanted to express that only the Query with would get the into the
cache, and that the is invoked when the goes from to .

However, that's not the case. A Query with a different QueryKey is a completely
new Query in the cache. It has no knowledge about your component or that you've
used a different QueryKey before. That means will be applied for it too (if it's
specified like above).

What we have to do is to be quite specific about which Query should get the :

```

Copycorrect-initial-data: copy code to clipboard

```

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# React Query meets React Router
URL: https://tkdodo.eu/blog/react-query-meets-react-router

# React Query meets React Router

— , , , , —

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * **#16: React Query meets React Router**
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Simplified data ingestion for
developers](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8327/0194f711-f2ff-7230-b2ba-49aaab073957/>)

is changing the game, and they are bringing their data fetching concepts
(loaders and actions) to purely client side rendered applications with . I went
through their great that shows the concept very well and demonstrates how you
can quickly build a small, but feature-rich app.

With React Router coming into the data fetching game, it is naturally
interesting to understand how this competes or correlates with existing data
fetching and caching libraries like React Query. So let me spoil it right here:

They are a match made in heaven

## A router that fetches data

To recap: React Router will allow you to define on each route, which will be
called when the route is visited. In the route component itself, you can to get
access to that data. Updating data is as simple as submitting a , which will
call an function. Actions invalidate all active loaders, so you'll automagically
see updated data on your screen.

If this sounds very similar to and - you are right, it does. So the questions
that have been popping up after the announcement of are:

  * Would we still want React Query now that we can fetch in the route?
  * If we already use React Query, do we want to (and how can we) leverage the new React Router features?

To me, the answers to both questions are clearly: YES. As from the remix team
has put it: "React Router is not a cache":

[Nah, React Router is not a cache.Browsers have this built in with HTTP and
libraries like React Query have this job nailed down.React Router is about
*when*, data caching libs are about
*what*.](https://tkdodo.eu/blog/<https:/x.com/ryanflorence/status/1561731634419773447>)

Fetching "as early as possible" is an important concept to provide the best
possible user experience. Full Stack frameworks like or Remix move this step to
the server, because that is the earliest entry point. With client rendered
applications, we have no such luxury.

What we are usually doing is fetching on component mount - when data is first
needed. That is not great, as it will lead to a loading spinner visible to the
user for as long as we are initially fetching. can help, but only for subsequent
navigations, and you need to manually set it up for every way to navigate to a
route.

The router however is the first component that always knows which page you are
trying to visit, and because it now has loaders, it can know which data those
pages need to render. This is great for the first page visit - but loaders are
called on page visit. And as the router has no cache, it will hit the server
again, unless we do something about it.

As an example (yes, this is from the tutorial mentioned before. Credits go to
Ryan Florence), suppose you have a list of contacts. If you click on one of
them, you show the contact details:

```

Copysrc/routes/contact.jsx: copy code to clipboard

// ⬇️ this is the loader for the detail route

// ⬇️ this gives you data from the loader

```

```

Copysrc/main.jsx: copy code to clipboard

// ⬇️ this is the loader for the detail route

```

If you navigate to , data for that contact will be fetched the component is
rendered. By the time we want to show the Contact, will have data readily
available. This is awesome as it not only improves the user experience, but look
at that developer experience of co-located data fetching and rendering! I love
it. 🥰

The big drawback of not having a cache shows when you go to Contact 2 and then
back to Contact 1 again. If you are used to React Query, you will know that data
for Contact 1 is cached already, so we can show it instantly and kick of a
background refetch if data is considered stale. With the loader approach, we
will have to fetch that data again (and wait for it to finish fetching!), even
though we have already fetched it before.

And that is exactly where React Query comes in.

What if we can use the loader to pre-fill the React Query Cache, but still in
the component to get all the React Query goodies like and showing stale data
instantly? To me, this sounds like the best of both worlds. The router is
responsible for fetching data early (if we don't have it), and React Query is
responsible for caching and keeping the data fresh.

Let's try to move the example in that direction:

```

Copysrc/routes/contacts.jsx: copy code to clipboard

// ⬇️ define your query

// ⬇️ needs access to queryClient

// ⬇️ return data or fetch it

// ⬇️ useQuery as per usual

```

```

Copysrc/main.jsx: copy code to clipboard

// ⬇️ pass the queryClient to the route

```

There are a couple of things going on here, so let's break it down:

### The loader needs access to the QueryClient.

The loader is not a hook, so we can't . Importing the QueryClient directly is
something that , so passing it explicitly seems like the best alternative.

We want the loader to wait for our data to be ready and return it to get a good
experience on the first loads. We also want errors to be thrown to the , so is
the best option. Note that doesn't return anything and catches errors internally
(otherwise, they are equivalent).

does the trick for returning any data we have in the cache, even if it's stale.
This ensures that recurring visits to a page will show data immediately. Only if
returns (meaning nothing is in the cache), we'll actually do the fetch.

An alternative approach would be to set a for :

```

Copyalternative-loader: copy code to clipboard

```

Setting the to two minutes tells to resolve data immediately if it's available
and not older than two minutes, otherwise, it will go and fetch it. If you are
fine with stale data being shown in the component, this is a good alternative.

Setting to is almost equivalent to the approach, except that manual query
invalidation takes precedence over . So I like the approach a bit better, even
if it is slightly more code.

​: As of , you can use the built-in method to achieve the same thing. It is
literally implemented with , but it's a common enough use-case for the library
to have it out of the box.

With this, it is guaranteed that calling in the component will have some data
available, just like calling would. However, TypeScript has no way of knowing
this - the data returned is of type .

Thanks to and his to React Query v4, we can now exclude from the union if is
provided.

And where would we get from? of course! We can even infer the type from the
loader function:

```

Copyinitial-data: copy code to clipboard

```

It's a bit much to write because our loader is a function that returns a
function, but we can tuck that away in a single util. Also, it seems that right
now, using type assertions is the only way to narrow the return type of . 🤷‍♂️
But it will nicely narrow the type of the result, which is what we want. 🙌

The next piece of the puzzle involves query invalidation. Here is how an action
would look without React Query, straight from the tutorial (yes, this is all it
takes to perform an update):

```

Copysrc/routes/edit.jsx: copy code to clipboard

```

Actions invalidate loaders, but because we've set up our loaders to always
return data from the cache, we won't see any updates unless we somehow
invalidate the cache. It's just one line of code really:

```

Copysrc/routes/edit.jsx: copy code to clipboard

```

The will make sure that our list and our detail view will get new data in the
cache by the time the action is finished, and we're redirecting back to the
detail view.

However, this will make our action function take longer and block the
transition. Would we not be able to trigger the invalidation, then redirect to
the detail view, show the stale data and then let it update in the background
once the new data is available? Of course we can: Just leave out the keyword:

```

Copysrc/routes/edit.jsx: copy code to clipboard

```

Await literally becomes a lever you can pull in either direction (This analogy
is based on Ryan's great talk . Please watch it if you haven't already):

  * Is it important to transition back to the detail view as soon as possible? Do not await.
  * Is it important to avoid potential layout shifts when showing stale data, or do you want to keep the action pending until you have all new data? Use await.

If multiple invalidations are involved, you can also mix and match the two
approaches to wait for important refetches, but let less important ones be done
in the background.

I'm very excited about the new React Router release. It's a great step forward
to enable all applications to trigger fetches as early as possible. However, it
is not a replacement for caching - so go ahead and combine React Router with
React Query to get the best of both worlds. 🚀

If you want to explore this topic some more, I've implemented the app from the
tutorial and added React Query on top of it - you can find it in [the examples
of the official
docs](https://tkdodo.eu/blog/<https:/tanstack.com/query/latest/docs/framework/react/examples/react-
router>).

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/seeding-the-query-cache

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * **#17: Seeding the Query Cache**
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8272/0194f712-097f-7741-a747-6d47d396aefc/>)

A new RFC about [first class support for
Promises](https://tkdodo.eu/blog/<https:/github.com/reactjs/rfcs/pull/229>) has
been released last week, and it got some talk going about how this would
introduce fetch waterfalls if used incorrectly. So what are fetch waterfalls
exactly?

A waterfall describes a situation where one request is made, and we wait for it
to complete before firing another request.

Sometimes, this is unavoidable, because the first request contains information
that is needed to make the second request. We also refer to these as :

In many cases though, we can actually fetch all the data we need in parallel,
because it is independent data:

In React Query, we can do that in two different ways:

```

Copyparallel-queries: copy code to clipboard

// 1. Use useQuery twice

// 2. Use the useQueries hook

```

In both variants, React Query will kick off data fetching in parallel. So where
do waterfalls come in?

As described in the above linked RFC, suspense is a way to unwrap promises with
React. A defining trait of promises is that they can be in three different
states: , or .

When rendering components, we are mostly interested in the success scenario.
Handling loading and error states in each and every component can be tedious,
and suspense is aimed at solving this problem.

When a promise is , React will unmount the component tree and render a fallback
defined by a boundary component. In case of errors, the error is bubbled up to
the nearest .

This will decouple our components from handling those states, and we can focus
on the happy path. It almost acts like synchronous code that just a value from a
cache. React Query offers a dedicated hook for that since v5:

```

CopyuseQuery-with-suspense: copy code to clipboard

// 👓 read data from cache

// 🎉 no need to handle loading or error states

/* TypeScript knows data can't be undefined */

// 🚀 Boundaries handle loading and error states

```

So this is nice and all, but it can backfire when you use multiple queries in
the same component that have suspense turned on. Here is what happens:

  * Component renders, tries to read the first query
  * Sees that there is no data in the cache yet, so it suspends
  * This unmounts the component tree, and renders the fallback
  * When the fetch is finished, the component tree is remounted
  * First query is now read successfully from the cache
  * Component sees the second query, and tries to read it
  * Second query has no data in the cache, so it suspends (again)

This will have pretty impactful implications on your application's performance,
because you'll see that fallback for waaay longer than necessary.

The best way to circumvent this problem is to stick to one query per component,
or to make sure that there is already data in the cache when the component tries
to read it.

The earlier you initiate a fetch, the better, because the sooner it starts, the
sooner it can finish. 🤓

  * If your architecture supports server side rendering - consider .
  * If you have a router that supports loaders, consider .

But even if that's not the case, you can still use to initiate a fetch before
the component is rendered:

```

Copyprefetching: copy code to clipboard

// ⬇️ initiate a fetch before the component renders

```

The call to is executed as soon as your JavaScript bundle is evaluated. This
works very well if you do , because it means the code for a certain page will be
lazily loaded and evaluated as soon as the user navigates to that page.

This means it will still be kicked off before the component renders. If you do
this for both queries in our example, you will get those parallel queries back
even when using suspense.

As we can see, the query will still suspend until both are done fetching, but
because we've triggered them in parallel, the waiting time is now drastically
reduced.

: doesn't support right now, but it might do in the future. If we add support,
the goal is to trigger all fetches in parallel to avoid those waterfalls.

I don't know enough about the RFC yet to properly comment on it. A big part is
still missing, namely how the cache API will work. I do think it is a bit
problematic that the default behaviour will lead to waterfalls unless developers
explicitly seed the cache early on. I'm still pretty excited about it because it
will likely make internals of React Query easier to understand and maintain. It
remains to be seen if it is something that will be used in userland a lot.

Another nice way to make sure that your cache is filled by the time it is read
is to seed it from other parts of the cache. Oftentimes, if you render a detail
view of an item, you will have data for that item readily available if you've
previously been on a list view that shows a list of items.

There are two common approaches to fill a detail cache with data from a list
cache:

This is the one also described : When you try to render the detail view, you
look up the list cache for the item you want to render. If it is there, you use
it as initial data for the detail query.

```

Copypull-approach: copy code to clipboard

// ⬇️ look up the list cache for the item

```

If the function returns , the query will proceed as normal and fetch the data
from the server. And if something is found, it will be put into the cache
directly.

Be advised that if you have set, no further background refetch will occur, as
initialData is seen as . This might not be what you want if your list was last
fetched twenty minutes ago.

As shown , we can additionally specify on our detail query. It will tell React
Query when the data we are passing in as was originally fetched, so it can
determine staleness correctly. Conveniently, React Query also knows when the
list was last fetched, so we can just pass that in:

```

CopyinitialDataUpdatedAt: copy code to clipboard

// ⬇️ get the last fetch time of the list

```

🟢 seeds the cache "just in time" 🔴 needs more work to account for staleness

Alternatively, you can create detail caches whenever you fetch the list query.
This has the advantage that staleness is automatically measured from when the
list was fetched, because, well, that's when we create the detail entry.

However, there is no good callback to hook into when a query is fetched. The
global callback on the cache itself might work, but it would be executed for
every query, so we'd have to narrow it down to the right query key.

The best way I've found to execute the push approach is to do it directly in the
, after data has been fetched:

```

Copypush-approach: copy code to clipboard

// ⬇️ create a detail cache for each item

```

This would create a detail entry for each item in the list immediately. Since
there is no one interested in those queries at the moment, those would be seen
as , which means they might be garbage collected after has elapsed (default: 15
minutes).

So if you use the push approach, the detail entries you've created here might no
longer be available once the user actually navigates to the detail view. Also,
if your list is long, you might be creating way too many entries that will never
be needed.

🟢 staleTime is automatically respected 🟡 there is no good callback 🟡 might
create unnecessary cache entries 🔴 pushed data might be garbage collected too
early

Keep in mind that both approaches only work well if the structure of your detail
query is exactly the same (or at least assignable to) the structure of the list
query. If the detail view has a mandatory field that doesn't exist in the list,
seeding via is not a good idea. This is where comes in, and I've written a
comparison about the two in [#9: Placeholder and Initial Data in React
Query](https://tkdodo.eu/blog/<placeholder-and-initial-data-in-react-query>).

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/inside-react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Develop and launch modern apps with MongoDB Atlas, a resilient data
platform.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8269/0194f712-21d3-7810-ae02-5d2af8927d94/>)

I've been asked a lot lately how React Query works internally. How does it know
when to re-render? How does it de-duplicate things? How come it's framework-
agnostic?

These are all very good questions - so let's take a look under the hood of our
beloved async state management library and analyze what really happens when you
call .

To understand the architecture, we have to start at the beginning:

It all starts with a . That's the class you create an instance of, likely at the
start of your application, and then make available everywhere via the :

```

Copyquery-client-provider: copy code to clipboard

// ⬇️ this creates the client

// ⬇️ this distributes the client

```

The uses to distribute the throughout the entire application. The client itself
is a stable value - it's created once (make sure you don't [inadvertently re-
create it too often](https://tkdodo.eu/blog/<react-query-fa-qs#2-the-
queryclient-is-not-stable>)), so this is a perfect case for using Context. It
will make your app re-render - it just gives you access to this client via .

### A vessel that holds the cache

It might not be well known, but the itself doesn't really do much. It's a
container for the and the , which are automatically created when you create a .

It also holds some defaults that you can set for all your queries and mutations,
and it provides convenience methods to work with the caches. In most situations,
you will interact with the cache directly - you will access it through the .

Alright, so the client lets us work with the cache - what is the cache?

Simply put - the is an in-memory object where the keys are a stably serialized
version of your (called a ) and the values are an instance of the class.

I think it's important to understand that React Query, per default, stores data
in-memory and nowhere else. If you reload your browser page, the cache is gone.
Have a look at the if you want to write the cache to an external storage like
localstorage.

The cache has queries, and a is where most of the logic is happening. It not
only contains all the information about a query (its data, status field or meta
information like when the last fetch happened), it also executes the query
function and contains the retry, cancellation and de-duplication logic.

It has an internal to make sure we don't wind up in impossible states. For
example, if a query function should be triggered while we are already fetching,
that fetch can be de-duplicated. If a query is cancelled, it goes back to its
previous state.

Most importantly, the query who's interested in the query data, and it can
inform those about all changes.

Observers are the glue between the and the components that want to use it. An is
created when you call , and it is always subscribed to exactly one query. That's
why you pass a to . 😉

The does a bit more though - it's where most of the optimizations happen. The
knows which properties of the a component is using, so it doesn't have to notify
it of unrelated changes. As an example, if you only use the field, the component
doesn't have to re-render if is changing on a background refetch.

Even more - each can have a option, where you can decide which parts of the
field you are interested in. I've written about this optimization before in [#2:
React Query Data Transformations](https://tkdodo.eu/blog/<react-query-data-
transformations#3-using-the-select-option>). Most of the timers, like ones for
or interval fetching, also happen on the observer-level.

A without an is called an query. It's still in the cache, but it's not being
used by any component. If you take a look at the React Query Devtools, you will
see that inactive queries are greyed out. The number on the left side indicates
the number of that are subscribed to the query.

Putting it all together, we can see that most of the logic lives inside the
framework-agnostic Query Core: , , and are all there.

That's why it's fairly straightforward to create an adapter for a new framework.
You basically need a way to create an , subscribe to it, and re-render your
component if the is notified. The adapters for and each have around 100 lines of
code only.

Lastly, let's look at the flow from another angle - starting with a component:

  * the component , it calls , which creates an .
  * that the , which lives in the .
  * that subscription might trigger the creation of the (if it doesn't yet exist), or it might trigger a background refetch if data is deemed stale.
  * starting a fetch changes the state of the , so the will be informed about that.
  * The will then run some optimizations and potentially notify the component about the update, which can then render the new state.
  * after the has finished running, it will inform the about that as well.

Please note that this is of many potential flows. Ideally, data would be in the
cache already when the component mounts - you can read more about that in [#17:
Seeding the Query Cache](https://tkdodo.eu/blog/<seeding-the-query-cache>).

What's the same for all flows is that most of the logic happens outside of React
(or Solid or Vue), and that every update from the state machine is propagated to
the , who then decides if the component should also be informed.

I hope it's now a bit clearer how React Query works internally. As always, feel
free to reach out to me on if you have any questions, or just leave a comment
below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/type-safe-react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Develop and launch modern apps with MongoDB Atlas, a resilient data
platform.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8269/0194f712-3611-7310-b5df-
ae714d2476e9/>)

I think we can all agree that using TypeScript is a good idea. Who doesn't like
type-safety? It's a great way to catch bugs early on, and it allows us to
offload some complexity of our apps to the type definitions so that we don't
have to keep them in our heads forever.

The level of type-safety can drastically vary from project to project. After
all, every valid JavaScript code be valid TypeScript code - depending on the TS
settings. And there is also a big difference between "having types" and "being
type-safe".

To truly leverage the power of TypeScript, there is one thing that you need
above all:

We need to be able to our type definitions. If we don't, our types become a mere
suggestion - we can't rely on them to be accurate. So we go above and beyond to
make sure we trust them:

  * We enable the of TypeScript settings.
  * We add to forbid the type as well as .
  * We point out all type assertions in code reviews.

And still - we are probably lying. A LOT. Even if we adhere to all the above
things.

Generics are essential in TypeScript. As soon as you want to implement something
remotely complex, you will have to reach for them - especially when you're
writing a reusable library.

However, as a user of a library, you ideally shouldn't need to care about their
Generics. They are an implementation detail. So whenever you provide a generic
"manually" to a function via the angle brackets, it's kinda bad for one of two
reasons:

It's either unnecessary, or you're lying to yourself.

Angle brackets makes your code look "more complex" than it has to be. As an
example, let's look at how is often written:

```

CopyuseQuery-with-angle-brackets: copy code to clipboard

//  ^?(property) data: Todo | undefined

```

The main problem here is that has four generics. By providing only one of them
manually, the other three fall back to their default values. You can read about
why that's bad in [#6: React Query and
TypeScript](https://tkdodo.eu/blog/<react-query-and-type-script#the-four-
generics>).

Just to be on the same page - returns (just like would, but does this slightly
better by giving us back per default). It doesn't know what the endpoint will
return. And because we don't want our property to be as well, we have to
"override" the inferred generic by providing it manually. Or do we?

The better way is to type the function itself:

```

Copytyped-fetchTodo: copy code to clipboard

// ✅ typing the return value of fetchTodo

// ✅ no generics on useQuery

// 🙌 types are still properly inferred

//  ^?(property) data: Todo | undefined

```

Now with this, React Query can properly infer what data will be from the result
of the . No need for manual generics. If the to is sufficiently typed, you will
have to add angle brackets to it. 🎉

Alternatively, we can also tell our data fetching layer, in this case , what the
expected type is by providing the Generics via angle brackets there:

```

Copyproviding-generics: copy code to clipboard

```

Now we don't even have to type the function if we don't want to because type
inference will again work for us here. Those generics are not unnecessary per
se, but they are a lie because they violate the golden rule of Generics.

### The golden rule of Generics

I learned this rule from great book . It basically states:

For a Generic to be useful, it must appear at least twice.

The so called "return-only" generics are nothing more than a type assertion in
disguise. The (slightly simplified) type signature for reads:

```

Copyaxios-get-type-signature: copy code to clipboard

```

The Type only appears in one place - the return type. So it's a lie! We could've
just as well written:

```

Copyexplicit-type-assertion: copy code to clipboard

```

At least this type assertion () is explicit and not hidden. It shows that we are
bypassing the compiler, that we are getting something unsafe and trying to turn
it into something we can trust.

And now we are back to trust. How can we trust that what we're getting over the
wire is in fact of a certain type? We cannot, and maybe that's okay.

I used to refer to this situation as a "trusted boundary". We trust that what
the backend returns is what we have agreed upon. If it's not, this isn't fault -
it's the fault of the backend team.

Of course, the customer doesn't care. All they see is "cannot read property name
of undefined" or something similar. Frontend devs will be called into the
escalation, and it will take us quite a bit of time to actually figure out that
we're not getting the right shape of data over the wire, because the error will
appear in a completely different place.

So is there something that we can do to give us trust?

is a beautiful validation library that lets you define a schema you can validate
against . On top of that, it infers the type of the validated data directly from
the schema.

This basically means that instead of writing a type definition and then
asserting that something is that type, we write a schema and validate that the
input conforms to that schema - at which point it that type.

I first heard about zod when working with forms. It makes total sense to
validate user input. As a nice side effect, the input will also be typed
correctly after the validation. But we can not only validate user input - we can
validate anything. Url params for example. Or network responses...

```

Copyparsing-with-zod: copy code to clipboard

// 👀 define the schema

// 🎉 parse against the schema

```

This isn't even more code than before. We've basically exchanged two things:

  * the manual type definition of the type with the definition.
  * the type assertion with the schema parsing.

This plays so well together with React Query because throws a descriptive if
something went wrong, which will make React Query go into state - just as if the
network call itself failed. And from the client perspective - it did fail,
because it didn't return the expected structure. Now we have an state that we
need to handle anyway, and there will be no surprises for our users.

It also goes nicely with another guideline of mine:

The more your TypeScript code looks like JavaScript, the better.

Apart from , there isn't a single thing that differentiates this TS code from
JS. There is no added TypeScript complexity - we just get the benefits of type-
safety. Type inference "flows" through our code like a hot knife through butter.
🤤

Schema parsing is a great concept to be aware of, but it's not for free. For
starters, your schemas should be as resilient as you want them to be. If it
doesn't matter that an optional property is or at runtime, you might create a
miserable user experience if you fail the query because of something like that.
So design your schemas resiliently.

Also, parsing does come with an overhead, as data must be analyzed at runtime to
see if it fits the required structure. So it might not make sense to apply this
technique everywhere.

You might have noticed that suffers from the same problem: It contains a return-
only generic, and it will default to if you don't provide it.

```

CopygetQueryData-generic: copy code to clipboard

//  ^? const todo: unknown

//  ^? const todo: Todo | undefined

```

Since React Query cannot know what you put into the (as there is no up-front
defined overall schema), this is the best we can do. Of course, you can also
parse the result of with a schema, but this isn't really necessary if you've
validated the cached data before. Also, direct interactions with the should be
done sparingly.

Tools on top of React Query, like , do a great job at alleviating the pain, but
they can only go so far and basically hide the lie a bit more for you.

While there isn't a lot more that React Query can do for us in this regard,
there are other tools that can. If you are in control over both your frontend
and backend, and if they even live in the same monorepo together, consider using
tools like or . They both build on top of React Query for the client-side data
fetching solution, but they both have what it takes to become truly type-safe:
an upfront API / router definition.

With that, types on the frontend can be inferred from whatever the backend
produces - without a chance of being wrong. They also both use for defining the
schema (tRPC is validation library agnostic, but is the most popular), so
learning how to work with could definitely go on your list to learn for 2023. 🎊

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# You Might Not Need React Query
URL: https://tkdodo.eu/blog/you-might-not-need-react-query

# You Might Not Need React Query

— , , , , —

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * **#20: You Might Not Need React Query**
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Find out how Algolia AI Search can instantly and precisely understand your
user's
intent.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8293/0194f712-4a03-7dc3-9268-70eab95e2d38/>)

Will kill React Query? This is probably the question I'm getting asked the most
for the past couple of months. And the thing is: I have no good answer.
Remember: Like most devs in this industry, I'm also just making things up as we
go. If you expect me to have a grand plan for everything, I'm here to
disappoint. I'm just as curious as you are how things will turn out in the end.
😅

[Not gonna lie that (as a maintainer of a library in the data fetching space)
I'm feeling mostly afraid of server components and suspense."How will this work
with react-query" is a good question. It feels like I'm supposed to have an
answer but I don't. Huge imposter syndrome
rn](https://tkdodo.eu/blog/<https:/x.com/TkDodo/status/1585204181651988481>)

That said, I now had some time to look at this topic a bit closer, and I also
discussed this with some folks who know way more about the topic than I do. I
now feel confident enough to give you on the topic. But that's all that is: , so
take it with a grain of salt.

Every tool that we're using should help us solve a problem that we're having.
Traditionally, React was pretty un-opinionated on how to do data fetching in
your application. It literally didn't care - here's and do with it what you
want.

This is the time libraries like or were born in. They filled a pretty big gap
and were quickly adopted because of their great DX and improvements they brought
for users as well. falls into a similar category - solving the need for routing
when your "view" library has nothing to offer out of the box.

When Server Side Rendering became a thing, we were mostly focussed on pre-
rendering html on the server to speed up the initial page load. After that, our
app behaves like a full SPA - client side page navigations and all. In this
world, React Query also plays an important role: You can move initial data
fetching to the server, and then hydrate the fetch results on the client. This
provides a good way to as early as possible - on the server.

Times are evolving, things get better. Even though it might look like things are
oscillating back and forth, they are, in fact, moving forward:

[i'm sure can do better but this is what i see in my head every time i see "devs
just go back and forth in endless cycles"
comments](https://tkdodo.eu/blog/<https:/x.com/swyx/status/1260019961868677121>)

React is still just a library to render components, but with Server Components,
it now offers a new application architecture where you can render them ahead of
time, on the server. This could be during build time, or at runtime, where they
allow access to data without building an API that needs to be queried from the
client:

```

Copyserver-component: copy code to clipboard

```

It still blows my mind that using inside a React Component , and it's exciting
to see frameworks picking up the problem and offering first class solutions to
them. This changes things dramatically for applications that are adopting this
architecture. React Query is, first and foremost, a library to manage
asynchronous state on the client. If your data fetching happens on the server
exclusively - why would you need it?

### You Might Not Need It

And the answer is: You probably don't. If you're starting a new application, and
you're using a mature framework like or that has a good story around data
fetching and mutations, you probably don't need React Query.

And that's totally fine. I'm not here to tell you to use React Query in every
possible situation, just because I happen to maintain it. If you decide to use
it, it should be because it helps you solve a problem.

There is still a lot of space to integrate React Query into this new world of
Server Components. For one, most projects won't start on a green field. There
are tons of applications out there that have been built over the years, and
while you can incrementally adopt the directory, leveraging Server Components
requires some sort of re-architecture.

For this transitioning period, React Query integrates very well with the
directory and Server Components. You can move some components to fetch on the
server only, or you can use Server Components to prefetch your cache and pass
the result to a client component, where you . It doesn't have to be all-or-
nothing. The already have a good guide for this integration, and I will likely
follow this up with another blog post on things to look out for.

This hybrid approach can be especially beneficial if you are hitting a use-case
that isn't (yet) well supported by Server Components.

As an example, you might want to render an Infinite Scrolling List, where you
pre-fetch the first page on the server, but you want to fetch more pages on the
client as the user scrolls towards the end. Or you might have the requirement to
have your app work as well. Or maybe you just like the user experience of always
seeing fresh data, even without an explicit user interaction (think: interval
fetching or all the smart auto-refetches you get from React Query).

React Query has a great story around all these situations, so there are
definitely cases where combining it with Server Components makes sense. However,
if you've used React Query primarily to fetch some data and display it to the
user, I think Server Components will have you nicely covered there as well. And
once the mutation story () become an established pattern, you might not even
need it for updating data.

I think it's also fair to say that not everybody will be adopting Server
Components, for various reasons. Maybe your backend is not written in nodeJs,
and it's fine that your frontend is an SPA without a dedicated server. Maybe
you're building a mobile app with React Native. If you're a TanStack Query user,
you might not even use React at all.

Further, you can use React Query for things data fetching. Have a look at the
replies to this tweet to get some inspiration:

[What are some things that you use TanStack Query for that is _not_ data
fetching? Curious to know what other use-cases you all have
😄](https://tkdodo.eu/blog/<https:/x.com/TkDodo/status/1616490384305311745>)

All of these are perfectly fine use-cases to choose Query as your async state
manager on the client. But if you are opting to go with a framework that has
built-in, first class support for this - please use that! I mean, why would you
use remix and not fetch data in their loaders? 🤷‍♂️

So, my prediction is that there will still be plenty of usages outside - and
even combined with - React Server Components for TanStack Query. The current
narrative is all about RSC though, and that's fine. It's a new, shiny piece of
tech that everybody is excited to try out.

But it's still quite early, bleeding edge tech. In order to use them, you have
to tightly integrate with a given framework, a router and a bundler. It also
means you need to have the infrastructure to handle the additional server load.
I kind of keep repeating myself, but:

there is no free lunch; everything is a tradeoff.

So, I would not feel obliged to move everything over to Server Components
immediately. As a Next.js user myself, I'm excited to move our app over to the
directory - mainly to benefit from nested routes. And I'll definitely move some
of the more static data fetching (e.g. where we have ) over to Server
Components.

But reports of React Query's death are greatly exaggerated.

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/thinking-in-react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * **#21: Thinking in React Query**
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with MongoDB Atlas, the leading developer data
platform](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8268/0194f712-5c53-7dc0-8261-f1a77bcd4b97/>)

Today's article comes in a different form: it's the slides + transcript from a
talk I recently gave at a meetup in Vienna, as well as on the remote day of .
You can swipe left or right or use the arrow buttons / arrow keys to switch
between the slides. You can also find the recording on . Enjoy!

Hello everyone 👋, thanks for being here with me today, where I want to talk
about...

Most people don't know that there is a right and a wrong way to tie your shoes.
Both ways look very similar at first glance, but one knot is stable and the
other loosens as you walk. It's a little difference that might change your life.
Stay tuned until the end where I'll show you that trick.

When working with React Query, we might face similar situations, where a small
tweak can make a huge difference.

I discovered this when I started my open source journey back in 2020, where I
was mostly helping out by engaging with the community.

I answered A LOT of questions on different platforms, which was a great way for
me to get started in open source. Turns out, people are really happy and
grateful if you help them solve their problem, and I also learned a lot by
having to look at situations I haven't encountered myself yet.

With that, I got to know React Query pretty well, and that's when I realized a
common pattern among those questions. A lot of them showed an underlying
misconception of what React Query is or does, and would probably answer
themselves with a little shift in thinking.

My name is Dominik, and I'm a Software Engineer from Vienna. I go by the name
TkDodo online almost everywhere, I work as a Frontend Tech Lead at Adverity, and
I've also had the privilege to maintain the open source library React Query for
the past two years.

So today, what I really want to talk about is showing you 3 simple ways on how
to approach react query with a better mindset. Similar to tying your shoes
correctly, once you know it, it hopefully makes a lot of sense and is quite
simple to follow.

So let's take a look at what it takes to be "Thinking in React Query"

The first point might surprise you, but it's true: Even though it is often
described as "the missing piece for data fetching in React", React Query is NOT
a data fetching library. It doesn't do any data fetching for you, because if we
take a quick look

at a standard react query example: we can see that we need to provide two things
to :

A unique where React Query will store the data for us,

and a that will be executed whenever data should be retrieved.

We can then of course use that hook in a component to render data and the
various states the query can be in, but if we take a quick look at the again...

we can see that in this example, it is implemented with axios, because, why not?
But the point is: THAT is your data-fetching library. React Query doesn't care
how you do it.

The only thing it cares about is if we are returning a or Promise.

In fact (and this is probably me talking as a library maintainer), if you're
filing an issue telling me you can't show a reproduction because your API is
private, I'll likely be telling you that this is the simplest way to implement
the - no data fetching at all:

All we are doing is - return a resolved Promise. Of course, React Query goes
very well data fetching libraries like axios, fetch or graphql-request because
they all produce Promises.

Once we understand that React Query doesn't fetch data, it hopefully becomes
clear that a whole class of questions around data fetching just disappear.
Questions like:

All questions around data fetching usually have the same answer:

  * How can I define a baseURL with React Query ?
  * How can I access response headers with React Query?
  * How can I make graphQL requests with React Query?

React Query doesn't care! Just somehow return a Promise, please.

Right, once we've got that, it's only fair to ask:

If React Query is no data fetching library, what is it? My answer to this
question has always been:

An Async State Manager. Now it's important to understand what we mean by "Async
State”.

Tanner Linsley, the creator of React Query, gave a great talk in May 2020
called: [It's Time to Break up with your "Global
State"](https://tkdodo.eu/blog/<https:/www.youtube.com/watch?v=seU46c6Jz7E>).

The talk is still very relevant today, please watch it if you haven't already.

The gist of it is that we have, for the longest time, sliced our state into we
need it to live. Do we only need it in one component? We'll probably start out
by using local state. Do we need it available higher up the tree?

Then we move it up and potentially pass data down again as props. Do we need it
even higher, or on a much broader scale?

We'd likely move it to a "global state manager" like redux or zustand, which
lives outside of React and then distributes it globally to our application.

And we've been doing this for all kinds of state - no matter if it's the toggle
button we're clicking in our app or the list of issues or profile data we have
to fetch over the network. We've treated them all exactly the same.

The shift in thinking comes when we split state differently - not it is used but
by it is.

Because state we own completely and that is synchronously available (like, when
I click that dark mode toggle button) has totally different needs than state
that is persisted remotely and asynchronously available, like a list of issues.

With async state or "server state”, we only see a snapshot in time of when we
fetched it. It can get out of date, because we are not the only owner of that
state. The backend, probably our database owns it. We have just borrowed it to
display that snapshot.

You might notice this when you leave a browser tab open for half an hour, and
then come back to it. Wouldn't it be nice to automatically see fresh and
accurate data? That means WE have to keep it up-to-date, because other users can
make changes in the meantime as well. And because state is not synchronously
available, meta-information around that state, like loading and error states,
need to be managed as well.

So, keeping your data up-to-date automatically and managing async lifecycles
isn't something you would get or need from a traditional, all-purpose state
manager. But since we have a tool that is geared towards async state, we can
make all that happen, and more. We just need to use the right tool for the right
job.

The second part we need to understand is what a "state manager" is, and why
React Query is one. What state managers usually do is making your state
available in your app efficiently. The important part here is , put another way,
I would frame it as:

We want updates please, but not too many.

If too many updates weren't a problem, we'd all just stick our state in React
Context. But it is a real problem, and a lot of libraries try to solve this in
various ways, some more magically than others. Redux and zustand - two popular
state management solutions - both offer a selector based api:

Those make sure that our components are only subscribed to parts of the state
they are interested in. If other parts of the store update, those components
don't care. And the principle is that we can call those hooks anywhere in our
App to get access to that state, because the libraries make it globally
available.

And with React Query, it's really not that different. Except that the part or
slice you're subscribing to is defined by the QueryKey

Now wherever we call our custom hook, we'll get updates if something changed in
the slice of the Query Cache. And if that isn't enough, we can take this a step
further, because ReactQuery has selectors as well:

Now we're talking "fine-grained" subscriptions, where components are only
interested in computed or derived results of what is stored. If we toggle one
issue from "opened" to "closed", the component that uses the hook won't re-
render because the length hasn't changed.

And just like with other state managers, we can (and very likely should) call
wherever we need to, to get access to that data.

This makes all solutions that try certain things like calling to sync data from
React Query somewhere else or setting data into local state in the (already
deprecated) callback anti-patterns.

All of these are forms of state syncing that take away the single source of
truth, and are unnecessary because React Query is already a state manager, so we
don't need to put that state into another one.

Okay okay you might be thinking, now I'm doing this, and I'm calling useQuery
wherever I want to / need to. 3 components, 3x . But if some of our components
are rendered conditionally, like when opening a Dialog or because we have
dependent queries, we might start to see a lot of fetches to the same endpoint.

You might be thinking: ugh, I just fetched this like 2 seconds ago, why is it
already fetching again?? So you turn to the docs...

and start to turn off everything, everywhere, all at once, just to not spam your
backend that much. Maybe we should've put our data in redux after all...

Bear with me for a second, because there is some logic to this madness. Why is
React Query making all those requests?

It brings us back all the way to the needs of async state: It can be outdated,
so we want to update it at some point in time, and React Query does this by
certain triggers: window focus, component mount, regaining network connection
and QueryKey change.

Whenever one of these events occurs, React Query will refetch that query
automatically.

But that's not the whole story. The thing is: React Query will not do this for
all Queries - only for Queries that are considered. And this brings us to the
second important takeaway of the day:

React Query is also a data synchronization tool, but that doesn't mean it'll
blindly refetch all queries in the background. This behaviour can be adjusted by
, which defines "the time until data goes stale". The opposite of is , so put
another way, as long as data is considered , it will be given to us from the
cache only, without a refetch. Otherwise, we'll get cached data AND a refetch.

So only stale queries will be updated automatically, but the thing is: staleTime
defaults to zero

Yep, zero as in zero milliseconds, so React Query marks everything as stale
instantly. That's certainly aggressive and can lead to overfetching, but instead
of erroring on the side of minimizing network requests, React Query errors on
the side of keeping things up-to-date.

Now defining is up to you - it highly depends on your resource and your needs.
There is also no "correct" value for .

If you are querying config settings that will only change when the server
restarts, can be a good choice.

On the other hand, if you have a highly collaborative tool where multiple users
update things at the same time, you might be happy with .

So a very important part of working with React Query evolves around defining .
Again, there is no correct value, what I like to do is set a default globally
and then potentially overwrite it when needed.

Okay, let's quickly go back to the needs of async state one more time. We know
that React Query keeps our cache up-to-date if data is considered stale and one
of those events occur.

The one event that is probably the most important of all and that I want to
focus on is the QueryKey change event.

When would that event mostly occur? Well, that brings us to the last point:

We should treat parameters as dependencies.

I really want to emphasize on this, even though it's already outlined in the
docs and I have written about it.

If you have parameters, like the filters in this example, that you want to use
inside your to make a request, you have to add them to the .

This ensures a lot of things that make React Query great to work with: For one,
it makes sure that entries are cached separately depending on their input, so if
we have different filters, we store them under different keys in the cache,
which avoids race conditions.

It also enables automatic refetches when changes, because we go from one cache
entry to the other. And it avoids problems with stale closures, which are
usually pretty hard to debug.

It's so important that we've released our own eslint plugin. It can check if
you’re using something inside the and tells you to add it to the key. It's also
auto fixable, and I can highly recommend using it.

If you want, you can think about the like the dependency Array for , but without
the drawbacks, because we don't have to think about referential stability.

There's no need for or to get involved here - not for the and not for the .

Now lastly, this might introduce a new problem: We're now using wherever we need
to, at any level in our App, but now we have dependencies to our Query that only
exists in a certain part of the screen: What if I don't have access to when I
want to call ? Where is it coming from?

The answer, again, is: React Query doesn't care. It's a pure problem. Because
that applied filter is. And how you manage that is up to you.

It's still totally fine to use local state or global state managers for that as
you see fit. Storing in the url is often a good idea, too.

As an example, let's take a look at how this could look if we've put the filters
into a state manager like :

The only thing we’ve changed is, instead of passing as input to our custom hook,
we are getting it from the store directly. This shows the power of composition
when writing custom hooks.

And we can see the clear separation between server state, managed by , and
client state, in this case, managed by . Every time we update in the store - no
matter where - the query will automatically run or read the latest data from the
cache if available.

This pattern will enable us to use React Query as a true async state manager.

  1. React Query is NOT a data fetching library - it’s an async state manager.
  2. is your best friend - but you have to set it up to your needs.
  3. Treat parameters as dependencies, and use our lint rule to enforce this.

If we change our thinking to follow these three points, we’ll have an even
better time working with React Query, much like a small tweak to how we tie our
shoes can be a great quality of life improvement.

Now I still owe you the solution to tying your shoes correctly.

It's really quite simple. When creating the loop, make sure to pull the shoelace
toward yourself first, then pull it through the gap.

This small difference will result in a knot that will stay horizontal and won't
come loose as easily.

There is also if you wanna go watch that.

So, that's all I got, thanks for listening. Be sure to follow me on , and
subscribe to my . React Query v5 is just around the corner and that is a good
way to keep up-to-date. Thanks!

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# React Query and React Context
URL: https://tkdodo.eu/blog/react-query-and-react-context

# React Query and React Context

— , , , , —

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * **#22: React Query and React Context**
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Develop and launch modern apps with MongoDB Atlas, a resilient data
platform.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8269/0194f712-7252-72d0-810a-e0bae9128030/>)

One of the best traits of React Query is that you can use a query wherever you
want in your component tree: Your component can fetch its own data, co-located,
right where you need it to be:

```

CopyProductTable: copy code to clipboard

```

To me, this is great because it makes the decoupled and independent: It's
responsible for reading its own dependencies: Product Data. If it's in the cache
already, great, we'll just read it. If not, we'll go fetch it. And we can see
similar patterns emerge with React Server Components. They, too, allow us to
fetch data right inside our components. No more arbitrary splits between and ,
or and components.

So being able to fetch data right in a component, where you need it, is
immensely useful. We can literally take the component and move it anywhere in
our App, and it will just work. The component is very , which is the main reason
why I'm advocating for accessing your query directly wherever you need to (via a
custom hook), both in [#10: React Query as a State
Manager](https://tkdodo.eu/blog/<react-query-as-a-state-manager>) and [#21:
Thinking in React Query](https://tkdodo.eu/blog/<thinking-in-react-query>).

It's not a silver bullet though - it comes with tradeoffs. This shouldn't be
surprising, because at the end of the day, everything is a tradeoff. But what
are we trading in here, exactly?

For a component to be autonomous, it means it has to handle cases where query
data is not available (yet), in particular: loading and error states. This is
not a big deal for our component, because very often, when it first loads, it
will actually display that .

But there are lots of other situations where we just want to read some
information from some parts of our query, where we that the query has been
already used further up the tree. For example, we might have a that contains
information about the logged-in user:

```

CopyuseCurrentUserQuery: copy code to clipboard

```

We will probably use this query quite early in our component tree, to check
which user rights the logged-in user has, and it might further determine if we
can actually see the page or not. It is information that we want everywhere on
our page.

Now further down the tree, we might have a component that wants to display the ,
which we can get from the hook:

```

CopyUserNameDisplay: copy code to clipboard

```

Of course, TypeScript won't let us, because is potentially undefined. But we
know better - it can't be undefined, because in our situation, the won't be
rendered without the query being already initiated further up the tree.

That's a bit of a dilemma. Do we want to just shut up TS here and do , because
we know it will be defined? Do we play it safe and do (which is possible here,
but might not be so easy to pull off in other situations)? Do we just add a
guard: ? Or do we add proper loading and error handling to all 25 places where
we call ?

To be honest - I think all of those ways are kind of suboptimal. I don't want to
litter my codebase with checks that can "never happen" (to the best of my
current knowledge). But I also don't want to ignore TypeScript, because (as
usual), TS is right.

Our problem comes from the fact that we have an : A dependency that only exists
in our head, in our knowledge of the application structure, but it's not visible
in the code itself.

Even though we know that we can safely call without having to check for data not
being defined, no static analysis can verify this. Our co-workers might not know
it. I myself might not know this anymore 3 months from now.

The most dangerous part is that it might be true now, but it might no longer be
true in the future. We can decide to render another instance of somewhere in our
App, where we might not have user data in the cache, or where we might have user
data in the cache , e.g. if we have visited a different page before.

This is quite the opposite of the component: Instead of being resilient to
change, it becomes error-prone to refactorings. We wouldn't expect the component
to break just because we move some seemingly unrelated components around...

The solution is, of course, to make the dependency . And there is no better way
to do this than with React Context:

There's quite the myth about React Context, so let's get this straight: No,
React Context is not a state manager. It can become a seemingly good solution
for state management when combined with or , but tbh, I've never really liked
this approach, as I've been burned by situations like these too much:

[🕵️ We've fixed a huge performance problem this week by moving useState +
context over to zustand. It was the same amount of code. The lib is < 1kb.⚛️
Don't use context for state management. Use it for dependency injection only.
The right tool for the
job!](https://tkdodo.eu/blog/<https:/x.com/TkDodo/status/1495072479118864398>)

So you'll likely be better off just using a dedicated tool. , maintainer of
Redux and writer of very long blog posts, has a good article on that topic:
[Blogged Answers: Why React Context is Not a "State Management" Tool (and Why It
Doesn't Replace
Redux)](https://tkdodo.eu/blog/<https:/blog.isquaredsoftware.com/2021/01/context-
redux-differences/>).

My tweet mentions it already: React Context is a tool. It allows you to define
which "things" your component needs to work, and any parent is responsible for
providing that information.

This is conceptually the same as prop-drilling, which is the process of passing
props down via multiple layers. Context allows you to do the same: Take some
values and pass them as props to children, except that you can leave out a
couple of layers:

With context, you just skip the middle man. In our example, it can help us make
that dependency explicit: Instead of reading the directly in all components
where we want to skip the data-availability check, we read it from React
Context. And that context will be filled by the parent that actually does the
first check:

```

CopyCurrentUserContext: copy code to clipboard

```

Here, we take the and put the resulting data into React Context, if it exists
(by eliminating loading and error states upfront). We can then read from that
context safely in our children, e.g. the component:

```

CopyUserNameDisplay-with-React-Context: copy code to clipboard

```

With that, we have made our implicit dependency (we know data has been fetched
earlier in the tree) explicit. Whenever someone looks at , they will know that
they need to have data provided from the . That is something you can keep in
mind when refactoring. If you change where the Provider is rendered, you will
also know that this will affect all children using that context. That's
something you can't know when a component is just using a query - because
queries are usually global in your whole app, and data might or might not exist.

TypeScript still won't like it much, because React Context is designed to also
work a Provider, where it will give you the default value of the Context, and
that's in our case. Since we never want to work in a situation where we are
outside a Provider, we can add an invariant to our custom hook:

```

Copycontext-with-invariant: copy code to clipboard

```

This method ensures that we will fail fast and with a good error message if we
ever accidentally access in the wrong place. And with that, TypeScript will
infer the value for our custom hook, so we can safely use it and access
properties on it.

You might be thinking: Isn't this "state syncing" - copying one value from React
Query and putting into another method of state distribution?

The answer is: No, it is not! The single source of truth is still the query.
There is no way to change the context value apart from the Provider, which will
always reflect the latest data the query has. Nothing gets copied here, and
nothing can get out of sync. Passing from React Query as a prop to a child
component is also not "state syncing", and since context is similar to prop
drilling, it's also not "state syncing".

Nothing is without drawbacks, and neither is this technique. Specifically, it
might create network waterfalls, because your component tree will stop rendering
(it "suspends") at the Provider, so child components won't be rendered and can't
fire off network requests, even if they are unrelated.

I'd mostly consider this approach for data that is for my sub-tree: User
information is a good example because we might not know what to render anyway
without that data.

Talking about Suspense: Yes, you can achieve a similar architecture with React
Suspense, and yes, it has the same drawback: potential request waterfalls, which
I've already written about in [#17: Seeding the Query
Cache](https://tkdodo.eu/blog/<seeding-the-query-cache>).

One problem is that in the current major version (v4), using on your query won't
type narrow , because there are still ways to disable the query and have it not
run.

However, since v5, there is an explicit hook, where data is guaranteed to be
defined once the component renders. With that, we can do:

```

CopyUserNameDisplay-with-suspense: copy code to clipboard

```

and TypeScript will be happy about it. 🎉

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/why-you-want-react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * **#23: Why You Want React Query**
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Find out how Algolia AI Search can instantly and precisely understand your
user's
intent.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8293/0194f712-8823-7460-b31c-e263dc10ee0b/>)

It's no secret that I ❤️ React Query for how it simplifies the way we're
interacting with asynchronous state in our React applications. And I know a lot
of fellow devs feel the same.

Sometimes though, I come across posts claiming that you don't need it to do
something as as fetching data from a server.

> We don't need all the extra features that React Query has to offer, so we
> don't want to add a 3rd party library when we can just as easily fire a in a .
To some degree, I think that's a valid point - React Query gives you a lot of
features like , , , , , ... and about a million more that would go way beyond
the scope of this article. It's totally fine if you don't need them, but I still
think this shouldn't stop you from using React Query.

So let's instead look at the standard fetch-in- example that came up on lately,
and dive into why it might be a good idea to use React Query for those
situation, too:

```

Copyfetch-in-useEffect: copy code to clipboard

// Return JSX based on data and error state

```

If you think this code is fine for simple use cases where you don't need
additional features, let me tell you that I immediately spotted 🐛 🪲 hiding in
these 10 lines of code.

Maybe take a minute or two and see if you can find them all. I'll wait...

Hint: It's not the dependency array. That is fine.

There are reasons why the recommend using either a framework or a library like
React Query for data fetching. While making the actual fetch request can be a
pretty trivial exercise, making that state available in your application is
certainly not.

The effect is set up in a way that it re-fetches whenever changes, which is
certainly correct. However, network responses can arrive in a different order
than you sent them. So if you change the category from to and the response for
arrives before the response for , you'll end up with the wrong data in your
component.

At the end, you'll be left with an state: Your local state will say that you
have selected, but the data you're rendering is actually .

The React docs say that we can fix this with a cleanup function and an boolean,
so let's do that:

```

Copyignore-flag: copy code to clipboard

// Return JSX based on data and error state

```

What happens now is that the effect cleanup function runs when changes, setting
the local flag to true. If a fetch response comes in after that, it will not
call anymore. Easy peasy.

It's not there at all. We have no way to show a pending UI while the requests
are happening - not for the first one and not for further requests. So, let's
add that?

```

Copyloading-state: copy code to clipboard

// Return JSX based on data and error state

```

Initializing with an empty array seems like a good idea to avoid having to check
for all the time - but what if we fetch data for a category that has no entries
yet, and we actually get back an empty array? We'd have no way to distinguish
between "no data yet" and "no data at all". The loading state we've just
introduced helps, but it's still better to initialize with :

```

Copyempty-state: copy code to clipboard

// Return JSX based on data and error state

```

## 4. Data & Error are not reset when category changes 🔄

Both and are separate state variables, and they don't get reset when changes.
That means if one category fails, and we switch to another one that is fetched
successfully, our state will be:

```

```

The result will then depend on how we actually render JSX based on this state.
If we check for first, we'll render the error UI with the old message even
though we have valid data:

```

Copyerror-first: copy code to clipboard

```

If we check data first, we have the same problem if the second request fails. If
we always render both error and data, we're also rendering potentially outdated
information . 😔

To fix this, we have to reset our local state when category changes:

```

Copyreset-state: copy code to clipboard

// Return JSX based on data and error state

```

## 5. Will fire twice in 🔥🔥

Okay, this is more of an annoyance than a bug, but it's definitely something
that catches new React developers off guard. If your app is wrapped in , React
will intentionally in development mode to help you find bugs like missing
cleanup functions.

If we'd want to avoid that, we'd have to add another "ref workaround", which I
don't think is worth it.

I didn't include this in the original list of bugs, because you'd have the same
problem with React Query: doesn't reject on HTTP errors, so you'd have to check
for and throw an error yourself.

```

Copyerror-handling: copy code to clipboard

// Return JSX based on data and error state

```

Our little "we just want to fetch data, how hard can it be?" hook became a giant
mess of spaghetti code 🍝 as soon as we had to consider edge cases and state
management. So what's the takeaway here?

Data Fetching is simple. Async State Management is not.

And this is where comes in, because React Query is NOT a data fetching library -
it's an async state manager. So when you say that you don't for doing something
as simple as fetching data from an endpoint, you're actually right: Even with
React Query, you need to write the same code as before.

But you still to make that state predictably available in your app as easily as
possible. Because let's be honest, I haven't written that boolean code before I
used React Query, and likely, neither have you. 😉

With React Query, the above code becomes:

```

Copyreact-query: copy code to clipboard

// Return JSX based on data and error state

```

That's about 50% of the spaghetti code above, and just about the same amount as
the original, buggy snippet was. And yes, this addresses all the bugs we found
automatically:

  * 🏎️ There is no race condition because state is always stored by its input (category).
  * 🕐 You get loading, data and error states for free, including discriminated unions on type level.
  * 🗑️ Empty states are clearly separated and can further be enhanced with features like .
  * 🔄 You will not get data or error from a previous category unless you opt into it.
  * 🔥 Multiple fetches are efficiently deduplicated, including those fired by .

So, if you're still thinking that you don't want React Query, I'd like to
challenge you to try it out in your next project. I bet you'll not only wind up
with code that is more resilient to edge cases, but also easier to maintain and
extend. And once you get a taste of all the features it brings, you'll probably
never look back.

A lot of folks on twitter mentioned missing request cancellation in the original
snippet. I don't think that's necessarily a bug - just a missing feature. Of
course, React Query has you covered here as well with a pretty straightforward
change:

```

Copycancellation: copy code to clipboard

// Return JSX based on data and error state

```

Just take the you get into the , forward it to , and requests will be aborted
automatically when category changes. 🎉

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/the-query-options-api

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * **#24: The Query Options API**
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with MongoDB Atlas, the leading developer data
platform](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8268/0194f712-a2c6-7262-90ea-8f2a84f23c57/>)

React Query version 5 was released about three months ago, and with it, we got
one of the biggest "breaking" changes in the library's history. All of our
functions now only get one object passed, instead of multiple arguments. We call
this object the , because it contains all the options you need to create a
query:

```

```

This isn't only true for calls, but also for imperative actions like
invalidating a query:

```

```

Now technically, this API isn't new. Most of our functions had overloads, so
even in v3, you could already pass an object instead of multiple arguments. It's
just that it wasn't really advocated for. All examples, the docs and many blog
posts (including this one) used the old API, which is why this was a breaking
change for most apps.

So why did we do it?

First of all, having all those overloads is a chore for maintainers, and it's
also not clear for users. Why can I call the same function in multiple ways - is
one better than the other? So, streamlining the API, thus making it easier for
new starters to understand it, was one goal. "Always pass one object" is as
simple and extensible as it gets.

But also, it turns out that one object to rule them all is simply a very good
abstraction for when you want to share query options between different
functions. I discovered this "by accident" when I wrote the [React Query meets
React Router](https://tkdodo.eu/blog/<react-query-meets-react-router>) article,
where want to share query options between prefetching and our call. Now usually,
you could just write custom hooks as your primary way to re-use queries. But
that doesn't work when imperative function calls like are involved. So I came up
with something, and noted this as a good pattern:

{/_NOTE: The tweet id leads to Alex's now protected X account_ /}

[First time I saw this React Query pattern was 's React Router blog
post](https://tkdodo.eu/blog/<https:/x.com/ralex1993/status/1570036707134676994>)

Turns out, if all your functions have the same interface - accepting a single
object - it makes a lot of sense to abstract that object away into a query
definition. Once you have that, you can pass it everywhere:

```

Copytodos-query: copy code to clipboard

```

In hindsight, this pattern just feels beautiful as the main abstraction for
queries, and I wanted to apply it everywhere. There was just one problem:

The way TypeScript handles excess properties is quite special. If you inline
them, TypeScript will be like: Why are you doing this - it doesn't make any
sense, I'll error out:

```

Copyinlined-objects: copy code to clipboard

```

Object literal may only specify known properties, but 'stallTime' does not exist
in type 'UseQueryOptions<Todo[], Error, Todo[], string[]>'. Did you mean to
write 'staleTime'?(2769)

Which is cool, because it catches typos like the one above. But what if you
abstract the whole object away into a constant, like our pattern suggests?

```

Copyno-error: copy code to clipboard

```

TypeScript is quite relaxed in these situations, because at runtime, the "extra"
property doesn't hurt, and you might want to use that object in a context where
the property is required. TypeScript can't know that. And since is optional, we
are now just passing it. Of course, this is "valid", but it's not what we'd
expect, and it can be a costly mistake to find.

That's why we've introduced a type-safe helper function in v5 called . At
runtime, it doesn't do anything:

```

CopyqueryOptions: copy code to clipboard

```

But on type level, it's a real powerhouse that not only fixes the above typo
issue (see the ) - it can also help us make other parts of the more type-safe:

There's one thing about and similar functions that has always been a bit
annoying in React Query: On type level, they return . That's because React Query
doesn't have an up-front, centralized definition, so when you call , there's no
way how the library could know what type will be returned.

We are forced to help out ourselves by providing the type parameter to the
function call:

```

Copymanual-type-parameter: copy code to clipboard

//  ^? const todos: Todo[] | undefined

```

To be clear, this isn't at all safer than just using type assertions, but at
least will be added to the union for us. If we refactor what our endpoint
returns, we won't be notified here of the new type. 😔

But now that we have a function that co-locates and , we can associate the type
of the and "tag" our with it. Notice what happens when we pass the that was
created via to :

```

Copytagged-query-key: copy code to clipboard

//  ^? const todos: Todo[] | undefined

```

This is pure TypeScript magic, contributed by the one and only . If we look at ,
we can see that it's not only a string array, but it also contains information
about what the returns:

```

CopydataTagSymbol: copy code to clipboard

```

That information will then be read out by (and other functions like , too), to
infer the type for us. This brings a whole new level of type-safety to React
Query, while at the same time making it easier for us to re-use query options. A
huge win in DX. 🚀

So, if you're asking me, I want to use this pattern and the helper everywhere. I
would even take it to a point where custom hooks won't be my first choice for
abstractions. They seem a bit pointless if all they do is:

```

Copycustom-hooks: copy code to clipboard

```

There's nothing wrong with calling in your component directly, especially if you
sometimes want to mix it with . Of course, if the hook does more, like
additional memoization with , it's still perfectly fine to add it. But I
wouldn't immediately reach for it like I did before.

Additionally, I'm seeing in a bit of a different light now. I've come to learn
that:

Separating QueryKey from QueryFunction was a mistake

The defines the dependencies to our - everything we use inside it must go into
the key. So why define keys in one central place while having the functions far
a way from them in our custom hooks?

However, if we the two patterns, we're getting the best of all worlds: Type-
safety, co-location and great DX. 🚀

An example query factory could look something like this:

```

Copyquery-factory: copy code to clipboard

```

It contains a mix of key-only entries that we can use to build a hierarchy and
for query invalidation, as well as full query objects created with the helper.

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# Automatic Query Invalidation after Mutations
URL: https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations

# Automatic Query Invalidation after Mutations

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * **#25: Automatic Query Invalidation after Mutations**
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8272/0194f712-b9b3-7f12-9dc2-3087fbbf4ca5/>)

Queries and Mutations are two sides of the same coin. A defines an asynchronous
resource for reading, which often comes from data fetching. A on the other hand
is an action to update such a resource.

When a Mutation finishes, it very likely affects Queries. For example, updating
an will likely affect the list of . So it might be a bit surprising that React
Query does not link Mutations to Queries at all.

The reason behind this is quite simple: React Query is totally about how you
manage your resources, and not everyone likes re-fetching after a Mutation.
There are cases where the Mutation returns updated data, which we'd want to then
[put into the cache
manually](https://tkdodo.eu/blog/<https:/tanstack.com/query/v5/docs/framework/react/guides/updates-
from-mutation-responses>) to avoid another network roundtrip.

There are also many different ways of how you'd want to do invalidation:

  * Do you invalidate in or ? The former will only be invoked when the Mutation succeeded, while the latter will also run in case of errors.
  * Do you want to invalidations? will result in the Mutation staying in state until the refetch has finished. This can be a good thing, for example if you'd want your form to stay disabled until then, but it might also be not what you want in case you want to navigate from a detail screen to an overview page as soon as possible.

Since there isn't a one-size-fits-all solution, React Query provides nothing out
of the box. However, it's not at all difficult to implement automatic
invalidation the way you want them to behave in React Query thanks to the .

Mutations have callbacks - , and , which you have to define on each separate .
Additionally, the same callbacks exist on the . Since there is only one for our
application, those callbacks are "global" - they are invoked for Mutation.

It's not quite obvious how to create a with callbacks, because in most examples,
the is implicitly created for us when we create the . However, we can also
create the cache itself manually and provide callbacks to it:

```

Copycreate-MutationCache: copy code to clipboard

```

The callbacks get the same arguments as the ones on , except that they will also
get the Mutation instance as last parameter. And just like the usual callbacks,
returned Promises will be awaited.

So how can the global callback help us with automatic invalidation? Well - we
can just call inside the global callback:

```

Copyautomatic-invalidation: copy code to clipboard

```

With just 5 lines of code, we get a similar behaviour to what frameworks like
Remix (sorry, React-Router) are doing as well: Invalidate everything after every
submission. Shout out to Alex for showing me this path:

[I just invalidate everything on every
mutation](https://tkdodo.eu/blog/<https:/x.com/alexdotjs/status/1744467890277921095>)

### But isn't that excessive ?

Maybe, maybe not. It depends. Again, that's why it isn't built in, because there
are too many different ways to go about it. One thing we have to clarify here is
that an invalidation doesn't always equate to a .

Invalidation merely refetches all Queries that it matches, and marks the rest as
, so that they get refetched when they are used the next time.

This is usually a good trade-off. Consider having an Issue List with filters.
Since each filter should be part of the QueryKey, we'll get multiple Queries in
the cache. However, I'm only ever viewing one of those Queries at the same time.
Refetching them all would lead to lots of unnecessary requests, and there's no
guarantee that I will ever go back to a list with one of those filters.

So invalidation only refetches what I currently see on the screen (active
Queries) to get an up-to-date view, and everything else will be refetched if we
ever need them again.

## Tying invalidation to specific Queries

Okay, hold on. What about fine-grained revalidation? Why would we invalidate the
data when we add an to our list? That barely makes sense ...

Again, a trade-off. The code is as simple as it gets, and I would prefer
fetching some data more often than strictly necessary over missing a refetch.
Fine-grained revalidation is nice if you know exactly what you need to refetch,
and that you'll never need to extend those matches.

In the past, we've often done fine-grained revalidation, just to find out that
we'd need to add another resource into the mix later which doesn't fit the used
invalidation pattern. At that point, we had to go through all mutation callbacks
to see if that resource needed to be refetched as well. That's cumbersome and
error-prone.

On top of that, we often use a medium-sized of ~2 minutes for most our Queries.
So the impact of invalidating after an unrelated user interaction is negligible.

Of course, you can make your logic more involved to make your revalidation
smarter. Here are some techniques I've used in the past:

MutationKey and QueryKey have nothing in common, and the one for Mutations is
also optional. You can tie them together if you want by using the MutationKey to
specify which Queries should be invalidated:

```

CopymutationKey: copy code to clipboard

```

Then, you can give your Mutation a to invalidate everything related only. And if
you have a Mutation without a key, it would still invalidate everything. Nice.

I often mark Queries as "static" by giving them . If we don't want those Queries
to be invalidated, we can look at the setting of a Query and exclude those via
the filter:

```

CopynonStaticQueries: copy code to clipboard

```

Finding out the actual for a Query is not that trivial, because is an observer
level property. But it's doable, and we can also combine the filter with other
filters like . Neat.

We can use to store arbitrary, static information about a Mutation. As an
example, we can add an field to give "tags" to our mutation. These tags can then
be used to fuzzily match Queries we'd want to invalidate:

```

Copythe-meta-option: copy code to clipboard

// invalidate all matching tags at once

// or everything if no meta is provided

```

Here, we still use the function to get a single call to . But inside of it, we
do fuzzy matching with - a function you can import from React Query. It's the
same function that gets used internally when passing a single as a filter, but
now, we can do it with multiple keys.

This pattern is probably only slightly better than just having callbacks on
itself, but at least we don't need to bring in the QueryClient with every time.
Also, if we combine this with invalidating everything per default, this will
give us a good way to opt-out of that behaviour.

## To Await or not to Await

In all the examples shown above, we are never an invalidation, and that's fine
if you want your mutations to finish as fast as possible. One specific situation
that I have come across a lot is wanting to invalidate everything, but have the
Mutation stay pending until one important refetch is done. For example, I might
want label specific Queries to be awaited after updating a label, but I wouldn't
want to wait until everything is done refetching.

We can build this into our solution by extending how that structure is defined,
for example:

```

Copymeta-awaits: copy code to clipboard

```

Or, we can take advantage of the fact that callbacks on the MutationCache run
callbacks on . If we have our global callback set-up to invalidate everything,
we can still add a local callback that just what we want it to:

```

Copylocal-onSuccess: copy code to clipboard

// returning the Promise to await it

```

  * First, the global callback runs and invalidates all Queries, but we since we neither nor anything, this is a "fire-and-forget" invalidation.
  * Then, our local callback will run immediately after that, where we will create a Promise for invalidating the only. Since we are returning that Promise, the Mutation will stay pending until are refetched.

I think this shows that it's not a lot of code to add an abstraction that you're
comfortable with for automatic invalidation. Just keep in mind that every
abstraction has a cost: It's a new API that needs to be learned, understood and
applied properly.

I hope by showing all these possibilities, it's a bit clearer why we have
nothing built into React Query. Finding an API that is flexible enough to cover
all cases without being bloated is not an easy thing to do. For this, I prefer
to give the tools to build this in user-land.

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/how-infinite-queries-work

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * **#26: How Infinite Queries work**
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[with MongoDB Atlas, the leading developer data
platform](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8268/0194f712-d0fc-7f32-9277-7c6223ebab21/>)

This week, a very interesting was filed for in React Query. It was interesting
because up to this point, I firmly believed that React Query doesn't have any
bugs.

Okay, not really, but I was pretty sure it doesn't have any bugs that would a)
affect a large number of users and b) would be because of some architectural
constraint in the library itself.

We do of course have edge-case bugs for quite specific situations that need
workarounds (can't really live without those) and also some known limitations
that might be annoying to accept, for example, that suspense is not working with
query cancellation.

But this bug report hit different. It was . We also didn't regress here - it has
always worked this way. It could still be classified as an edge case, because
for it to happen, you would need to:

  * Have an Infinite Query that has already once successfully fetched multiple pages.
  * Have a refetch where fetching at least one page succeeded, but then the next page failed to fetch.
  * Use at least one retry (default is three).

This likely won't hit you every day, but it also isn't a huge edge-case. I was
surprised that in the last four years, no one has reported this. So I asked on
twitter and it seems like users have been getting this bug in the past, but also
didn't think React Query would have such a huge flaw and thus didn't report it.
Seems like we're at least all aligned on the overall quality in React Query. 🙌

To understand the issue (and why it freaked me out initially), we have to
understand how infinite queries are different from normal "single queries".

Infinite queries are React Query's way to make those doom-scrolling pages we all
hate so much somewhat simple to implement. In many ways, they are identical to
single queries.

In our cache, every query is represented as an instance of the class (If you
haven't read , now would be a good time). That instance is responsible for
managing the state around the query, and it also holds the for the current
fetch. That's what makes work - if is called while the query is already in
fetching state, the active promise will be re-used.

Further, the query holds an instance of a , which is singlehandedly responsible
for doing all logic around retries. If a query wants to fetch data, it tells the
to start, and it'll get a back. That promise will only resolve or reject after
all retries have been used up.

A simplified, pseudo-code version would look something like this:

```

Copyretryer: copy code to clipboard

```

The will call the passed to it, and it might call it multiple times when doing
retries (this is important for understanding the bug, so remember this). All of
this is the same for single queries and infinite queries, as there is no
separate representation of an in the cache.

The only thing that really distinguishes infinite queries is how is structured
and how we retrieve that . Usually, what you return from the winds up directly
in the cache - a simple 1:1 relationship.

With infinite queries, every single call of the will only return one part - one
- of the whole data structure. The pages are like a linked list, where every
page depends on the previous one to get its data.

But conceptually, it's still just one query that lives under one QueryKey. We
achieve the difference by attaching a different to it.

I wasn't totally honest before about the fact that the gets passed directly to
the . There is a thin layer around it. For single queries, it's set to executing
the only. But for infinite queries, it will take the function from the :

```

Copyquery-behavior: copy code to clipboard

```

The behavior for an infinite query knows what it has to do when it is being run.
For example, when you call , it knows to call the passed to it once and append
the page to the cached data. If a refetch happens, it executes the in a loop,
always calling to ensure consistency. It might look something like this:

```

CopyInfiniteQueryBehavior: copy code to clipboard

```

I think conceptually, this is a brilliant design. All we need to do to make a
query an infinite query is to attach the to it, and the rest works just the
same. The function on the literally does just this:

```

CopyfetchInfiniteQuery: copy code to clipboard

```

Nothing more to be done. No differences in caching, revalidation or
subscriptions. So where's the bug?

It has to do with the hierarchy of things: The holds the , and the receives the
returned from the . As we established earlier, the might fire the multiple
times, namely if it catches an error and retries.

Since the has the fetching loop, the whole loop will re-start and re-fetch in
case of a retry. This doesn't matter if the first page failed to fetch, but if a
page in the middle fails (the bug reproduction mentions rate limiting as a
realistic example), we will re-set the loop and start from scratch. With rate
limiting, this means we might never succeed in fetching all pages!

This freaked me out because I was questioning the architecture. Do we need to
reverse the order? Does every fetch inside the need its own retryer? That would
be a huge refactoring, and it would likely also affect single queries.

I couldn't stop thinking about this bug. I didn't want to completely re-write
those layers. I thought that the only thing missing was having the remember at
which point to re-start the loop. It turns out, this is trivial with javascript
closures. We can hoist the relevant information out of the returned function, so
when it's invoked again, it will "remember" where it was:

```

Copyhoisting: copy code to clipboard

```

This way, when fails, the will pause and eventually call the again. But now, it
will know where it has to continue, and it will also still retain the
information about previously successfully fetched pages. 🎉

Sure, this means a setting of means three retries over all pages, not three
retries per page, but it's still consistent with how single queries work - it's
three retries , no matter how often it actually fetches.

If you want to see the actual fix, the PR can be found on . Also thanks to for
working with me on this and for creating the initial failing test case. 🙏

Of course I added a regression in that PR and broke , but that's a story for
another day ...

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# React Query API Design - Lessons Learned
URL: https://tkdodo.eu/blog/react-query-api-design-lessons-learned

# React Query API Design - Lessons Learned

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * **#27: React Query API Design - Lessons Learned**
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Automate site indexing, catalog pages, & refine your search accuracy with
Algolia’s website
crawler](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8328/0194f712-e664-7173-a5f4-4673e1055a83/>)

Here are the slides + transcript from the talk I recently gave at the conference
in London. You can swipe left or right or use the arrow buttons / arrow keys to
switch between the slides. You can also find the recording on . Enjoy!

Hello everyone 👋 I'm super excited to be here today, because this is the first
time that I'm giving a live talk at an in-person conference, and I'm very happy
that it's happening at React Advanced in London today.

My name is Dominik, and I'm a Software Engineer from Vienna, where I work as a
frontend tech lead at Adverity. You can find me as TkDodo online almost
everywhere, and for the last three and a half years,

I have maintained a quite popular open source React Library React Query

sorry, TanStack React Query as we call it these days.

Quick question, raise your hands - who of you has heard about react query? Who
has worked with it?

That's great - it means you might know some of the APIs I'm gonna talk about,
because today, I want to...

... walk you through some of the API design choices that we made in React Query,
tell some stories about things that went well, but also highlight tradeoffs and
mistakes that we made, and what lessons we can all learn from those. And I want
to talk about that, mainly for two reasons:

1. API Design is hard.
If you don't believe me, Julius said it. Very smart guy, he maintains tRPC, also
contributes to React Query. If he says it, it's probably right.

and 2. I think React Query has a really really sweet API, which I think is part
of why React Query has become so successful in the last couple of years.

Now of course I can't take credit for that - Tanner Linsley made the library and
designed most APIs, and he has a very good tweet summarizing the goal:

@Tan_Stack Query's API is actually medium sized when you unpack it all, but the
most important part is that you can understand and learn how to use it by
starting with a single function that provides 80% of the entire value
proposition first try. From there, the rest of its API can be gradually learned
if needed.

And I think that's what it takes for a library to become popular -

It needs to be both minimal and intuitive as well as powerful and flexible. Now
for any given API...

... those two things are usually at the opposite side of the same scale.

Take for example: very good example for a minimal API that does one thing very
well, no surprises, super intuitive.

On the other side of the spectrum, I'd see, which is very powerful (you can
implement all array functions with reduce) and flexible, but can be hard to
understand and if that's the only API we have available, we'd also not be happy.

So the missing part is the second scale, which is usually "app complexity". As
app complexity grows, your APIs should likely become more powerful & flexible.

So on that scale, would be right about here (bottom left) if you pass the
minimal required options to it:

Simple API, easy to use, but it gives you a ton of things:

Caching, Request Deduplication, stale-while-revalidate background updates,
global state management, automatic garbage collection, handling loading states,
error states + retries, the list goes on...

Then you might add a useMutation for performing updates and tying them to
queries with query invalidation; that's already a bit more code, but you can
really get very far with just those two (useQuery and useMutation).

And as your app complexity grows,

...so does the flexibility of the Query APIs that you are using. You might want
to add an optimistic update, or an infinite query - those are certainly a bit
more involved.

And all the way on the right side of the scale, we have our Persister Plugins
and fine-grained direct cache subscriptions (which we e.g. use to build the
devtools). Now you don't need to learn those when you're starting out, but once
you reach a certain app complexity, you are probably happy that those exist.

Okay, so we got to this API that evolves with you ...

...through careful planning, lots of iteration and a couple of major versions.
So that gets me right to my first learning I had as an open source maintainer

I'm no longer excited about major versions (and probably neither should you).

I think API design is especially hard in open source because whatever we decide
- we can't easily revert it.

At adverity, we used to distribute our design-system via a private npm registry.
Now we have a monorepo so we don't need to anymore, but we adhered to semantic
versioning, and do you know what the latest version of that was?

Nobody cared. It's just numbers going up. Most projects would just update, see
that the "major change" was either affecting a component they weren't using at
all, or was a tiny change, fixed it an moved on. It just wasn't a big deal.

But in open source, we cannot do breaking changes lightly,

it has to be a marketing event really. We need announcement tweets and videos
and blogposts and everything

Users hear about a new "major" version. Major sounds "huge", and "good", so the
immediate question is always:

What are the new features?

The problem is: major versions are not about features. They are about breaking
existing APIs. Features mostly go in minors.

Remember hooks? They came in 16.8. React Router added route loaders in 6.4, and
bun added windows support in 1.1

That's because adding features rarely needs to break an existing API. Of course
there are exceptions, e.g. when you re-design something from the ground up that
enables some new features. But usually, features come in minors.

So when I got asked about the new features in React Query v5, I started to
sweat. We basically wanted to break a lot of APIs and rename things, and there
weren't any features planned.

So we added some things that honestly, we could've also backported to v4. This
is by no means great because we're withholding features from users just to have
some kind of "marketing event" and "great new version".

If it were up to me, I'd want a better system. Something where we decouple
"breaking changes" from "marketing events". Anthony Fu had a great suggestion:

to do 4-digit semver, so you can have an epoch number before major that you can
use for big overhauls or for marketing. I think it's a nice idea. I doubt it
will happen though - just something to think about.

And maybe, when a new version comes out - don't think about what's new - ask
what's breaking instead.

Okay, So I'm no longer excited about major versions, but what I am still excited
about, even more than before I started with open source, is TYPESCRIPT.

Don't worry - we're not gonna go into library level typescript today, but if
you're building something, I think it helps tremendously to think about types
from the beginning and

design your APIs with types in mind.

Now there are lots of people who say that you should "just make it work" first
and you can figure out the types later. I think they're wrong. When working with
JavaScript, we can come up with all sorts of cute and dynamic constructs that
work at runtime, but are very hard to type.

Sure, almost everything is doable with enough magic, but usually, the price for
that is type complexity and maintenance burden.

Not sure who said it, but this phrase stuck with me:

If something is hard for a compiler to figure out, it's also hard for humans to
understand. So if we are having troubles expressing what we want to the
compiler, maybe the API we've chosen isn't the best.

One of the "cute and dynamic" constructs we had in React Query from when it
started out (where it had no types), was was actually , because you could call
it 3 different ways:

with different positional arguments. There's no good way to make this work in
TypeScript except with overloads, which is what we did. Overloads are
problematic because they are a lot of overhead and error messages aren't good.

TypeScript will try all overloads and then show an error for the last one it
tried, which might be completely misleading. Also, we had to do some runtime
checks to transform different version into the same structure. And really, who
needs three ways to achieve the same thing?

So since v5, you can only call useQuery with the options syntax. With that, we
reduced lines of types on useQuery by 80% - from 125 to just 25 lines of types.

Had we started with types in mind from the beginning, I think this is where we
would've landed right away. Okay enough about TypeScript already, there's one
thing that always comes up once a library reaches a certain threshold of usage:

And to be honest, managing a demanding user base is one of the more tricky
things in open source. On the one hand, if you want to gain adoption, you need
to listen to user feedback and meet their expectations, help them fix their
problems etc. On the other hand, the more you add to your library the more
bloated the API becomes, adding complexity and thus reducing adoption again. We
have to balance this somehow.

My advice here would be to just take your time before adding anything. Users can
be very demanding, and in that relationship between user and maintainer, it's
their job to tell you all about their use-case and how important it is for them
and their deadlines

But it's the maintainer's job to have the bigger picture in mind. Will this work
for everybody? What about cases that the original requester hasn't considered
because they don't even know about them… Remember: once an API is added, we
can't change it without a new major release.

An example where I got this wrong was the refetchPage API for infinite queries.
For context, infinite queries are our way to make building doom-scrolling pages
simple - sorry about that. But technically, an infinite query is just one cache
entry that is chunked up into multiple pages, where each page is built upon the
previous one.

Now quite a lot of people complained that whenever a refetch occurs, React Query
would refetch all pages that are currently in the cache and wanted a way to only
refetch a single page, e.g. after updating a specific entry on that page.

This sounded reasonable at first, so we added a new field to some existing APIs
like invalidateQueries.

Now, instead of refetching all pages, you could return false to have a specific
page not refetch. That API was a mistake for a couple of reasons:

The API is weird and confusing. refetchPage now exists on invalidateQueries, but
invalidateQueries doesn't know about the type of a query. If there is a match
for tasks that is a non-infinite query, the param does nothing.

We only added this API to imperative methods because of technical constraints.
If an automatic refetch occurs that was triggered by React Query, you would
still refetch all pages.

Correctness is the main reason why we invalidate all pages per default. Each
page builds upon the next like a linked-list. If you only refetch a page in the
middle and one entry was deleted by someone else in the meantime, your UI can
get weirdly out of sync.

So we took a step back and asked people that used it what their main motivation
was, and it was always the same: If the user scrolls down a lot, and I have 100
pages in the cache, I don't want to spam my server. That's fair, so we tried to
find an API that solves that problem instead. Eventually,

we settled on a new option on useInfiniteQuery - maxPages, which simply allows
you to limit how many pages you have in your cache.

This API is a lot better because it solves the problem holistically (from a
different point of view), for all kinds of refetches, and also speeds up
rendering when you navigate to a page that has cached entries. We shipped in v5
and removed refetchPages completely.

My takeaway here is that I landed on a suboptimal API decision too quickly, and
had I given myself more time to really understand the problem we're trying to
solve, I could've come up with something better.

The only alternative really is to ship new APIs with an unstable or experimental
name, which can work but might lead to users not really wanting to use it. We
did this for some APIs, and these are the messages I get, so I'm not sure if
that's really better.

Another API that also gets requested often is to be able to debounce API calls.
You would want that for example when having a search field and you want to auto-
filter.

Unless you want to fetch on every keystroke, you likely want some way of
debouncing that. This is a very good example for a feature that will not make it
into React Query because it's not its responsibility. There are a lot of ways to
do debouncing in different ways, and it likely needs more than just a number as
an option. This can get complicated fast, and also adds more bundle size.

The good news is that you can relatively easily implement this in user-land

You can use your favourite implementation, write one yourself,

or just from React. The way this works is that filter will contain the current
user input to display, and debouncedFilter has the debounced value that you pass
to React Query.

This "Inversion of Control" is a great way to give users the flexibility to
implement features on their own and still keep a small API surface.

Now the QueryKey is quite special here, but we can get inversion of control on
other options as well by simply making them a function.

On example is a discussion I had with a user who felt that refetches on window
focus, which are turned on by default via refetchOnWindowFocus: true aren't
great when the Query is in error state, which I agree might not be what you
want. But to add a separate option just for that case is not a great API. So
instead, what we did was make it accept a callback function:

The function always gets the query passed, and you can derive from that what you
want. That makes it very easy to implement that and similar feature in user-
land. So by now, we've made almost all options accept callback functions. It's a
cheap trick to allow users to implement certain behaviours for different states
of the Query.

Okay lastly, even if we keep all these points in mind, no matter how well we try
to design an API, some people will be unhappy with it.

And they will usually be the loudest. And open source maintainers are not immune
to making errors, so chances are that eventually, we'll release an API that
isn't well received. I learned that lesson the hard way in v4 of React Query,
where we made some changes to our primary states.

Let's take that search example from before again and see what happens if we
handle loading and error states in v4 with the derived boolean flags isLoading
and isError.

This worked fine in v3, but in v4, it would just render a spinner for all
eternity.

That's because queries that start in a disabled state are also in "isLoading"
state. Now there are of course reasons for this, and it didn't sound as bad when
I thought about it, but objectively, when you zoom out a bit and have no
knowledge about React Query and you see this code and how it behaves - it's a
very bad API. Absolutely horrible, no excuses. Turns out, a lot of people felt
that way:

And I agree - that's messed up. Btw, that counter is still going up even though
we've since fixed this in v5. But we got those reports right AFTER we had
released the v4 major version. That feedback would've been very good a couple of
days earlier.

What stuck with me is the user expectation that maintainers get everything right
in their APIs while at the same time, the willingness to try out beta versions
and report feedback is limited.

So if there's one thing that you take away from this talk, I want it to be this:

Please help out maintainers of open source libraries you are using by trying out
a beta version and report feedback. I guarantee you it's the best time to be
heard.

Without that early feedback, mistakes might make it into the "stable" release.
But "stable" doesn't mean bug-free or battle-tested - it just means we can't
change our APIs anymore - it's now set in stone.

Open source is a two-way street, and this is one of the best ways to help while
also getting the most in return.

That's all I got, thank you 🙏

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# React Query - The Bad Parts
URL: https://tkdodo.eu/blog/react-query-the-bad-parts

# React Query - The Bad Parts

  * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * **#28: React Query - The Bad Parts**

[ with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8274/0194f712-fae6-7a72-87f2-1b50b666d4a4/>)

Here are the slides + transcript from the talk I recently gave at the
conference. You can swipe left or right or use the arrow buttons / arrow keys to
switch between the slides. You can also find the recording on . Enjoy!

This is gonna be a quick one, almost a lightning talk really - because mostly,

... React Query is just great ❤️. I think it's really loved by the community for
providing a great Developer Experience and User Experience alike. Now I know
that's a bold claim, but I have brought some data to back that up:

If we look at weekly download numbers on NPM, React Query has grown a lot this
year - from 4 million to almost 6 million - a 50% increase.

Now those are huge numbers, but let's compare that to React ...

which is also growing strong, sitting at 27M weekly downloads. Our curve doesn't
look as impressive anymore, but it also kinda implies that React Query is used
in more than 20% of all React applications, or in every 5th app.

And some of those apps ...

... have millions of users themselves, like sentry, bsky or chatGPT, so React
Query really gets a lot of exposure.

Now of course download numbers and usage aren't everything, just because
something is used often doesn't necessarily mean it's liked.

Maybe a better way is to look at surveys:

State of frontend 2024 is quite new, and they asked "which tools have you used
to fetch data in the last year"?

I'm not gonna nit pick that RQ isn't a data fetching solution like axios or
fetch, but behind those, it comes with a very high positive sentiment: Only 2.8%
of people who used it didn't like it.

State of React has a similar question around "Utilities for loading and managing
data", and if we group that by positive sentiment, TanStack Query actually comes
out at the top with just over 44%.

So, I'm really happy that developers seem to like the library ...

... because I've been maintaining it for the last 4 years.

My name is Dominik, I'm a Software Engineer living in Vienna, where I will be
joining the Frontend Platform Team @ sentry next month. You can find me as
TkDodo online almost everywhere, and I also have a blog where I write about
React and TypeScript, and of course, React Query.

I've written and talked a lot about why React Query is great, and it really is,
but still:

everything is a tradeoff. Using any piece of technology is usually a good
tradeoff if the thing we are getting in return is better for us (worth more)
than what we are trading in.

I think React Query is really a good tradeoff for most situations, but of course
there are cases where it might not be the best fit.

So today, I want to talk about these cases, but also debunk some myths I've
heard about React Query that make it sound like it's bad when it probably isn't.

So maybe the talk is more like React Query - The Tradeoffs.

So let's get started with the first point, the elephant in the room -

the bundle-size. React Query has a huge bundle size is something I hear often as
it's largest drawback.

Okay let's first establish what the "bundle size" isn't:

It’s not what you see on npm. That’s the size that gets shipped when developers
install the library. Yes, it's over 700kb, but we also ship codemods and all the
sources and source-maps for you to better debug the lib if necessary. It's
definitely NOT what gets shipped to the customer.

...also not what you see on bundlephobia. It's a good site to get a quick
overview, but it doesn't understand ESM properly (neither do I btw). We ship a
special "legacy" build for older bundlers (👋 webpack 4) that isn’t as optimized,
and that is what bundlephobia also picks up. (Any modern bundler like vite or
webpack 5 will see the more modern ESM build). So no, that size is also too
large.

So where can we get the "correct" size then?

I like bundlejs because it builds what we export on-the-fly with esbuild and
show its size impact.

If we export everything from React Query, we get to 12.4 kB minzipped. Now
that's not nothing, but it’s also not a lot. If we care about size, we should
probably use brotli compression instead of gzip -

that would get it down to 12 kb, nice.

But that is when we really use every single feature the library has to offer, so
it isn't the typical starting point. You'll usually get quite far with just a ,
a , and .

That gets it to under 10kb - 9.63 kB to be exact.

Don't get me wrong - bundle size is an important thing to look at before adding
a dependency.

But the debate about what is "light-weight" and what isn't is not the most
important one when it comes to a central tool like your async state manager -
Especially because there's one metric that is easily left out - likely because
it isn't easy to track:

and that is bundle size you save by code you don't have to write

A library like react-query "pays for itself" because the more you use it, the
more it saves you code that you would otherwise have to write yourself.

So when checking bundle size of a library, it's important to not only think
about the immediate size it adds, but also what it can save you in the long run.
And on that scale, React Query is a clear and easy win for me. Most custom
solutions would likely be larger or would fail in edge case, because caching and
cache invalidation is hard.

The next myth I would like to debunk is ...

the fact that React Query can't even fetch on a button click. I get that a lot.
The argument is that it's hard for React Query to do imperative data fetching.
And it's true - React Query is declarative by default.

We define a QueryKey and a QueryFunction for useQuery, and it runs
automatically:

This code will try to read tasks from the cache, and if they don't exist, it
will go fetch and cache them for us. It will also do a background refetch if the
data is considered stale.

So far, so good. Now let’s try to add filtering to our Task List

We'll add a filter form that has an callback, and when that gets called, we’d
want to refetch the list with new filters:

If we explore what returns, we might find the method, and want to try passing
...

... filters directly to . Seems reasonable, except that doesn't accept any
arguments, so this won't work.

I understand the frustration about this - but it's just not how React Query is
designed to work. See, if we have a static key

like and we'd refetch with different arguments for that static key, we would not
only overwrite previously cached data, we would also run into race conditions
that you'd get with fetching in .

React Query has solved both of these problems with a declarative approach - by
making your ...

"dependencies" (what you use inside the QueryFunction) part of the QueryKey.
That means we have to store our somewhere, for example, in React State.

When the applied filters change, the key changes and React Query will see a new
cache entry and will get data for it, or read it from the cache.

This will get us from the imperative thinking: "If I click this button, I want
to refetch" towards the declarative form of: "I want data that matches this
state". How it changes is irrelevant.

It's also irrelevant how / where we store the applied filters. With TanStack
Router...

it's a pretty straight forward change to make a navigation with different search
params instead of storing it in React State:

This is of course type-safe depending on the search param schema defined on the
route, and now, we get a bunch of things for free, like sharable urls or browser
back button navigation 🎉

Another cool thing is that if you change filters back to something you've
already fetched, you'll get an instant result. That's because React Query caches
everything separately by its key. It's a simple document cache, which means the
complete response will be stored under that key.

So yeah, in this example, if a task is both AND, it will be in both caches,
because there is ...

...no normalized caching in React Query. In a normalized cache, every piece of
data is stored once, and other parts only reference it, to avoid data
duplication.

Dedicated solutions for GraphQL, like Apollo Client or urql, offer normalized
caching because they are aware of the schema and the relations between the
entities.

React Query only knows Promises - it doesn't actually know what's inside the
cache.

In the long feature comparison list from the docs page, Normalized Caching is
pretty much the only thing React Query flat out doesn't support. It's a pretty
hard problem to solve and can add a lot of complexity, so the tradeoff we've
chosen is to not support it. I think that for most applications, refetching upon
invalidation works well and is easier to understand too.

So yeah, if you're using GraphQL and need normalized caching, React Query might
not be the right choice for you.

There is however a community tool I want to highlight called. It tries to bring
automatic normalization and data updates to data fetching libraries, and it has
integrations for React Query, swr and rtk-query, so you might want to check that
out if it sounds interesting to you.

Okay, so we don't do normalized caching because we try to keep things simple,
yet...

I still hear that React Query is complex and has a steep learning curve.

If something is "easy to understand" for someone is always subjective - Things
that are straight-forward for you might be a total mystery to me.

But it's undeniable that React Query, like any concept worth applying, has a
learning curve, and it also has an API surface that isn't particularly small.

I went into a lot of details about React Query's API design in my talk at the
React Advanced Conference earlier this year, so definitely check that one out if
you want an in-depth look at this topic.

Just to touch on it - Tanner has a great tweet summarising the design-goals of
React Query, where he says that ...

@Tan_Stack Query's API is actually medium sized when you unpack it all, but the
most important part is that you can understand and learn how to use it by
starting with a single function that provides 80% of the entire value
proposition first try. From there, the rest of its API can be gradually learned
if needed.

So while Query's API might seem overwhelming at first, you don't need to learn
everything at once.

You can start with with the minimal required options, which will already give
you a ton of things:

Caching, Request Deduplication, stale-while-revalidate background updates,
global state management, automatic garbage collection, handling loading states,
error states + retries, the list goes on ...

Then you might add a for performing updates and tying them to queries with query
invalidation; that's already a bit more code, but you can really get very far
with just those two ( and ).

And as your app complexity grows, you might want to look deeper into what React
Query has to offer.

Maybe you want to add an optimistic update, or an infinite query - those are
certainly a bit more involved.

And all the way on the right side of the scale, we have our Persister Plugins
and fine-grained direct cache subscriptions, which are really powerful &
flexible. We e.g. use them to build our devtools.

Once you reach a certain application complexity, you are probably happy that
those exist, but ...

...the Query API is absolutely designed to evolve with you.

So don't believe that it's necessary to learn everything from the start if that
feels overwhelming. Yes, there's a lot to learn, but you can get there
incrementally.

Okay so once you've learned the API and you're thinking that it's actually
great...

... you might want to start managing ALL your state with it. But since React
Query is bad...

it really doesn't want you to do that. React Query is really designed to work
with async state - it's...

an Async State manager that knows about the need of server state. It knows that
the data we're seeing is only a snapshot of the source of truth, which lives on
the server. It revalidates it and keeps what we see up-to-date, ...

because it's also a data synchronization tool. It also makes assumptions about
your connectivity status and potentially retries getting that state.

This is what we love about React Query, but those are all things you don't need
when you're storing something synchronous like a side-bar-state toggle....

IF I had to write that with React Query, this is probably what it would look
like, which is far from ideal.

1) come up with a unique key like that can't collide with anything else

2) we don't actually need a because there is no async work to be done. We just
pass and update that with .

3) and we need to turn of a bunch of configs to stop React Query from doing what
it does best - managing and synchronizing async state.

This isn't easy to get right, it's verbose and it's not very efficient either.

The split in client state and server state is very much on purpose, because they
have different needs. So let's use the right tool for the right job. There are
plenty of solutions available to manage client state, for example:

- it's minimal, efficient and un-opinionated. We define a store with our state and actions to update that state. I've then created a custom hook to keep the same API as the previous implementation.
A quite similar solution I also really like is

because it works a bit better in TypeScript and is event driven.

But the thing is, there are no surprises with either one, they are both
perfectly capable of efficiently managing that client state for us, so they are
definitely better choices than using React Query for everything.

Okay, so finally, the last thing I'm often hearing is quite funny: Why do I even
need a 3rd party library to do something as basic as data fetching - why

why isn't this built into React?

I can't really answer that because I don't work on React, but I've certainly
felt the frustration myself that we don't have a first class async primitive
built into React ...

But I think the reason could be that the React team really wants to get an API
right before they ship it. As an example,

we're still wondering why they didn't ship context selectors - something that a
lot of people have been requesting to get fine-grained subscriptions to a
context.

In this example, we'd have a that contains a bunch of settings, but is only
interested in updates to the theme value, and should only re-render if color has
changed.

The change itself would probably not be hard to implement - but they aren't
doing it because the React team has a different vision - a place where ...

we can call the new operator inside , and React will bail out of rendering if we
return the same values.

Now this already composes a lot better than selectors, and eventually, this
might lead to a place where we can just write ...

that code without thanks to the React Compiler.

This is a great vision, but it takes time to get there (so this doesn't exist
yet), and I think with data fetching, it's a similar story. Everyone "just wants
useQuery", but the React Team thinks bigger.

Suspense is a beautiful architecture where your components get de-coupled from
handling loading and error states. It works so well with TypeScript too because
data can’t be .

And of course, the vision goes beyond client-side data fetching.

To solve problems at a scale, React now spans to the server as well thanks to
Server Components. I wish I had a quote but I couldn't find a good one from the
React team, so I'm just gonna say it:

Suspense and Server Components ARE the async primitive we've been waiting for.
And if you're able to work with a framework that supports Server Components,
please use them, and until then - .

That's al I got, thank you 🙇‍♂️

That's it for today. Feel free to reach out to me on if you have any questions,
or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#client-state-vs-server-state

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Develop and launch modern apps with MongoDB Atlas, a resilient data
platform.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8269/0194f713-0ab5-7483-a711-8c3744371908/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#react-query

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[**GenAI apps + MongoDB Atlas** You don't need a separate database to start
building GenAI-powered
apps.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8271/0194f713-29a0-7a62-a28f-a2311948ac32/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#the-defaults-explained

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Simplified data ingestion for
developers](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8326/0194f713-4a17-7013-9f1d-da445354d412/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#use-the-react-query-devtools

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[A better way for small teams to share an email inbox.**Give it a try for
free!**](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8333/0194f713-6730-7842-a460-93d80a703461/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[video to see firsthand how to upgrade your site with end-to-end AI
Search.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8294/0194f713-8508-72c3-a7df-
ed1b1b9b08cc/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#a-new-cache-entry

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Transform docs into structured data with
Sensible.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8289/0194f713-a985-7b43-a942-516eb289228b/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#keep-server-and-client-state-separate

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Engineered with a suite of integrated services to let you build and deploy
quickly.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8272/0194f713-ca83-72d0-99a8-5489a271716c/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * **#2: Putting props to useState**
URL: https://tkdodo.eu/blog/putting-props-to-use-state

* **#2: Putting props to useState**
  * [#3: Things to know about useState](https://tkdodo.eu/blog/<things-to-know-about-use-state>)
  * [#4: useState for one-time initializations](https://tkdodo.eu/blog/<use-state-for-one-time-initializations>)

[A better way for small teams to share an email inbox.**Give it a try for
free!**](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8333/0194f713-f5ce-78a0-99af-560271f6aeaa/>)

In the of the useState pitfalls series, I talked about avoiding state all
together for derived state.

This part is about a common scenario, where we want to initialize our state with
values we get as props. This is something we probably do a lot, and it's not
per-se wrong, but it has some potential issues that we need to be aware of.

I will use a classic list / detail use-case as example. We have a list of
persons, and selecting one of them will result in a detail form being filled. We
want to show the persons' email address in the detail form, and also have an
apply button that will update that data.

It's an interactive example, so feel free to click around (the code is also
editable 🚀):

const persons = [ { id: 1, name: 'Dominik', email: 'dominik@dorfmeister.cc', },
{ id: 2, name: 'John', email: 'john@doe.com', }, ] function App() { const
[selected, setSelected] = React.useState(persons[0]) return ( <div>
{persons.map((person) => ( <button type="button" key={person.id} onClick={() =>
setSelected(person)} > {person.id === selected.id ? person.name.toUpperCase() :
person.name} </button> ))} <DetailView initialEmail={selected.email} /> </div> )
} function DetailView({ initialEmail }) { const [email, setEmail] =
React.useState(initialEmail) return ( <div> <input type="text" value={email}
onChange={(event) => setEmail(event.target.value)} /> <button type="button"
onClick={() => alert(email)}> Apply </button> </div> ) } render(<App />)

You might notice right away that the example is working. You can edit the email
address and click , but if you click on , the input field will not update.

As much as React wants us to rather than in lifecycles, when it comes to state,
there is a big difference between the first render (also known as ) and further
renders (better known as ).

The initial value of a useState hook is always on re-renders - it only has an
effect when the component .

When you click on , the DetailView component will be re-rendered (because it
already exists on the screen), which means that John's email will not be put
into our state. Bummer, because we still need the local state to edit the email
address (to keep the draft changes). We don't want to update the person Array
directly, because we might never click Apply.

I know three ways to handle this and similar use-cases:

## 1. Conditionally render the DetailView

We do this a lot when we are using Modals or other components that appear on
screen.

Showing the DetailView in a Modal will magically make our code above work,
because Modals are usually rendered conditionally. When we click on , we mount a
Modal, thus the useState initial value will be respected. When the user closes
the Modal, it will be , and the next time a person is selected it will be again.

Here is how that might look:

const persons = [ { id: 1, name: 'Dominik', email: 'dominik@dorfmeister.cc', },
{ id: 2, name: 'John', email: 'john@doe.com', }, ] function App() { const
[selected, setSelected] = React.useState() const close = () =>
setSelected(undefined) return ( <div> {persons.map((person) => ( <button
type="button" key={person.id} onClick={() => setSelected(person)} >
{person.name} </button> ))} {selected && ( <div style={{ position: 'fixed', top:
'0', left: '0', paddingTop: '100px', width: '100%', height: '100%',
backgroundColor: 'rgba(0,0,0,0.4)', }} > <div style={{ display: 'flex',
justifyContent: 'center', width: '80%', height: '50vh', margin: 'auto',
backgroundColor: 'white', }} > <DetailView initialEmail={selected.email}
close={close} /> <span style={{ cursor: 'pointer' }} onClick={close}> &times;
</span> </div> </div> )} </div> ) } function DetailView({ initialEmail, close })
{ const [email, setEmail] = React.useState(initialEmail) return ( <div> <input
type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
<button type="button" onClick={() => { alert(email) close() }} > Apply </button>
</div> ) } render(<App />)

Excuse my css, I suck at this part of web development 😅

But the example works now. That is because the Modal conditionally renders our
DetailView, which will make it mount again.

I'm sure many of you have done that a lot, and it's a valid solution. But be
aware that this only works because you are rendering the DetailView in the
Modal. If you want the DetailView to be renderable everywhere, we would need a
different solution.

You've probably heard this phrase before, the official React docs also have [a
section on that topic](https://tkdodo.eu/blog/<https:/reactjs.org/docs/lifting-
state-up.html>).

For this example, it basically just means to take the draft state and move it
further up the tree, thus making our DetailView a fully controlled component.
Since the DetailView then doesn't need any local state at all, we won't have the
problem of putting props into state.

const persons = [ { id: 1, name: 'Dominik', email: 'dominik@dorfmeister.cc', },
{ id: 2, name: 'John', email: 'john@doe.com', }, ] function App() { const
[selected, setSelected] = React.useState(persons[0]) const [email, setEmail] =
React.useState(selected.email) return ( <div> {persons.map((person) => ( <button
type="button" key={person.id} onClick={() => { setSelected(person)
setEmail(person.email) }} > {person.id === selected.id ?
person.name.toUpperCase() : person.name} </button> ))} <DetailView email={email}
setEmail={setEmail} /> </div> ) } function DetailView({ email, setEmail }) {
return ( <div> <input type="text" value={email} onChange={(event) =>
setEmail(event.target.value)} /> <button type="button" onClick={() =>
alert(email)}> Apply </button> </div> ) } render(<App />)

Now, the App has full control over all the state, and the DetailView is just a
so-called "dumb component". This approach is feasible for many use-cases, but
it's not without drawbacks.

Typing in the input field will now re-render the whole App with every keystroke.
While this is not a problem for this small example, it might be a problem for
bigger Apps. People often resort to global state managers because they promise
to re-render efficiently.

One could also argue that the scope of the draft email state is now too big. Why
does the App even care about that, it probably only cares about the new email
once the user hits Apply.

The third approach is kind of the middle ground between the two: Keep the same
ux and the scope of the draft state small, but still re-mount your form when you
need to.

## 3. Fully uncontrolled with a key

const persons = [ { id: 1, name: 'Dominik', email: 'dominik@dorfmeister.cc', },
{ id: 2, name: 'John', email: 'john@doe.com', }, ] function App() { const
[selected, setSelected] = React.useState(persons[0]) return ( <div>
{persons.map((person) => ( <button type="button" key={person.id} onClick={() =>
setSelected(person)} > {person.id === selected.id ? person.name.toUpperCase() :
person.name} </button> ))} <DetailView key={selected.id}
initialEmail={selected.email} /> </div> ) } function DetailView({ initialEmail
}) { const [email, setEmail] = React.useState(initialEmail) return ( <div>
<input type="text" value={email} onChange={(event) =>
setEmail(event.target.value)} /> <button type="button" onClick={() =>
alert(email)}> Apply </button> </div> ) } render(<App />)

This is exactly the same code as in the first example, with just one small
change:

```

```

The attribute on a React component is a special thing. Keys are mostly used for
lists to signalize stability to React, so that the reconciler knows which
elements can be re-used, and thus re-rendered.

However, you can also just put a key attribute on any component to tell React:
"Please mount this whenever the key changes. As long as the key is the same,
please re-render".

This can be seen a little bit like the dependency array in effects. If it
changes, compared to the previous render, React will re-run the "mounting" of
the component.

If you want to know more, please read this .

You might be tempted to solve the problem with an effect that "syncs" props to
state:

```

Copysyncing-props-and-state: copy code to clipboard

```

I would consider effects like these generally an anti-pattern. If effects are
used for syncing, they should be used to sync React state with something of
React, e.g. with localstorage.

But here, we are syncing something that already lives inside React with React
state. Further, the condition on which we sync does not really reflect what we
want to achieve: We want to reset the state whenever another person is selected,
necessarily when the email changes.

The first solution does this via conditional rendering, the second one by
setting the state explicitly when the button that selects a person is clicked,
and the third one by providing a stable key (the selected persons' id).

Emails might be a suboptimal example, because they are generally also unique,
but what if two persons have the same data (e.g. a firstName)? The effect won't
re-run, even though we click on a different person, and thus the draft state is
not reset.

Similarly, what if the data changes in the parent component (e.g. because of a
re-fetch by ), but our user has already changed the value in the input field?
Would we really want to override the user input in these cases?

So, effects like these open you up to a bunch of hard-to-track errors in corner
cases that you'd better avoid.

Personally, I don't have a preferred solution. I have used all three approaches
occasionally.

The detail view owning the draft state has some advantages, but unmounting comes
with a bit of a cost, and you don't always have a stable key or a clear
indication when a component should be reset.

Lifting state up also has advantages, as fully controlled components are usually
easier to reason about, but it might not always be easily doable in large
applications.

Whatever you decide, please, don't use the syncing state "solution". To me, this
approach is similar to the old lifecycle, which was also used to sync props with
state. I don't recall that ending well. is a very good article from 2018 by on
that anti-pattern, which also heavily inspired this article.

Which solution do you prefer? leave a comment below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#the-enabled-option-is-very-powerful

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[video to see firsthand how to upgrade your site with end-to-end AI
Search.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8294/0194f714-0dd0-7881-86ca-604cb29db057/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#dont-use-the-querycache-as-a-local-state-manager

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[No more spaghetti code. Build SMS solutions
fast.](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8200/0194f714-3131-75d1-a715-ecd357f8e9ca/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

# * [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
URL: https://tkdodo.eu/blog/practical-react-query#create-custom-hooks

* [#2: React Query Data Transformations](https://tkdodo.eu/blog/<./react-query-data-transformations>)
  * [#3: React Query Render Optimizations](https://tkdodo.eu/blog/<./react-query-render-optimizations>)
  * [#4: Status Checks in React Query](https://tkdodo.eu/blog/<./status-checks-in-react-query>)
  * [#6: React Query and TypeScript](https://tkdodo.eu/blog/<./react-query-and-type-script>)
  * [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/<./using-web-sockets-with-react-query>)
  * [#8: Effective React Query Keys](https://tkdodo.eu/blog/<./effective-react-query-keys>)
  * [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/<./leveraging-the-query-function-context>)
  * [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/<./placeholder-and-initial-data-in-react-query>)
  * [#10: React Query as a State Manager](https://tkdodo.eu/blog/<./react-query-as-a-state-manager>)
  * [#11: React Query Error Handling](https://tkdodo.eu/blog/<./react-query-error-handling>)
  * [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/<./mastering-mutations-in-react-query>)
  * [#14: React Query and Forms](https://tkdodo.eu/blog/<./react-query-and-forms>)
  * [#16: React Query meets React Router](https://tkdodo.eu/blog/<./react-query-meets-react-router>)
  * [#17: Seeding the Query Cache](https://tkdodo.eu/blog/<./seeding-the-query-cache>)
  * [#20: You Might Not Need React Query](https://tkdodo.eu/blog/<./you-might-not-need-react-query>)
  * [#21: Thinking in React Query](https://tkdodo.eu/blog/<./thinking-in-react-query>)
  * [#22: React Query and React Context](https://tkdodo.eu/blog/<./react-query-and-react-context>)
  * [#23: Why You Want React Query](https://tkdodo.eu/blog/<./why-you-want-react-query>)
  * [#24: The Query Options API](https://tkdodo.eu/blog/<./the-query-options-api>)
  * [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/<./automatic-query-invalidation-after-mutations>)
  * [#26: How Infinite Queries work](https://tkdodo.eu/blog/<./how-infinite-queries-work>)
  * [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/<./react-query-api-design-lessons-learned>)
  * [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/<./react-query-the-bad-parts>)

[Simplified data ingestion for
developers](https://tkdodo.eu/blog/<https:/server.ethicalads.io/proxy/click/8327/0194f714-54b3-7443-b5f9-3a55cb27884b/>)

When GraphQL and especially became popular in ca. 2018, there was a lot of fuss
about it completely replacing redux, and the question has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some
data fetching library replace your global state manager? What does one even have
to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the
data for you, similar to what e.g. does for REST, and that you would still
obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State

What Apollo gives you is not just the ability to describe which data you want
and to fetch that data, it also comes with a for that server data. This means
that you can just use the same hook in multiple components, and it will only
fetch data once and then subsequently return it from the cache.

This sounds familiar with what we, and probably many other teams as well, have
mainly been using for: Fetch data from the server and make it available
everywhere.

So it seems that we have always been treating this like any other . Except that
when it comes to (think: A list of articles that you fetch, the details of a
User you want to display, ...), your app does not own it. We have only borrowed
it to display the most recent version of it on the screen for the user. It is
the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can
leverage the cache to display data that we do not own, there isn't really much
left that is real client state that needs to be made available to the whole app.
That made me understand why many think that Apollo can replace redux in lots of
instances.

I have never had the chance to use GraphQL. We have an existing REST API, don't
really experience problems with over-fetching, it just works, etc. Clearly,
there aren't enough pain points for us to warrant a switch, especially given
that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the
frontend, including the handling of loading and error states. If only there were
something similar in React for REST APIs...

Made by the open sourcerer in late 2019, React Query takes the good parts of
Apollo and brings them to REST. It works with any function that returns a
Promise and embraces the caching strategy. The library operates on sane defaults
that try to keep your data as fresh as possible while at the same time showing
data to the user as early as possible, making it feel near instant at times and
thus providing a great UX. On top of that, it is also very flexible and lets you
customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are from
various Talks that you can watch, and Tanner has a React Query you can take if
you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might
be useful when you are already working with the library. These are things I have
picked up over the last couple of months when I was not only actively using the
library at work, but also got involved in the React Query community, answering
questions on Discord and in GitHub Discussions.

I believe the React Query are very well-chosen, but they can catch you off guard
from time to time, especially at the beginning.

First of all: React Query does invoke the on every re-render, even with the
default of zero. Your app can re-render for various reasons at any time, so
fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render
> resiliency.
If you see a refetch that you are not expecting, it is likely because you just
focused the window and React Query is doing a , which is a great feature for
production: If the user goes to a different browser tab, and then comes back to
your app, a background refetch will be triggered automatically, and data on the
screen will be updated if something has changed on the server in the meantime.
All of this happens without a loading spinner being shown, and your component
will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially
because focusing between the Browser DevTools and your app will also cause a
fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between and , so let me try to
clear that up:

  * : The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen .
  * : The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the that
needs adjusting. I have rarely ever needed to tamper with the . There is a good
in the docs as well.

### Use the React Query DevTools

This will help you immensely in understanding the state a query is in. The
DevTools will also tell you what data is currently in the cache, so you'll have
an easier time debugging. In addition to that, I have found that it helps to
throttle your network connection in the browser DevTools if you want to better
recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array

I am referring to the dependency array of the hook here, which I assume you are
familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So
when we pass a variable parameter to our , we almost always want to fetch data
when that value changes. Instead of orchestrating complex effects to manually
trigger a refetch, we can utilize the query key:

```

Copyfeature/todos/queries.ts: copy code to clipboard

```

Here, imagine that our UI displays a list of todos along with a filter option.
We would have some local state to store that filtering, and as soon as the user
changes their selection, we would update that local state, and React Query will
automatically trigger the refetch for us, because the query key changes. We are
thus keeping the user's filter selection with the query function, which is very
similar to what a dependency array represents for useEffect. I don't think I
have ever passed a variable to the that was part of the , too.

Because the query key is used as a key for the cache, you will get a new cache
entry when you switch from 'all' to 'done', and that will result in a hard
loading state (probably showing a loading spinner) when you switch for the first
time. This is certainly not ideal, so if possible, we can try to pre-fill the
newly created cache entry with . The above example is perfect for that, because
we can do some client side pre-filtering on our todos:

```

Copypre-filtering: copy code to clipboard

```

Now, every time the user switches between states, if we don't have data yet, we
try to show data from the 'all todos' cache. We can instantly show the 'done'
todos that we have to the user, and they will still see the updated list once
the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate

This goes hand in hand with , an article I have written last month: If you get
data from , try not to put that data into local state. The main reason is that
you implicitly opt out of all background updates that React Query does for you,
because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and
render your Form once you have data. Background updates are very unlikely to
yield something new, and even if, your Form has already been initialized. So if
you do that on purpose, make sure to fire off unnecessary background refetches
by setting :

```

Copyinitial-form-data: copy code to clipboard

```

This concept will be a bit harder to follow through when you display data that
you also want to allow the user to edit, but it has many advantages. I have
prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from
React Query into local state. This makes sure that we always see the latest
data, because there is no local "copy" of it.

### The enabled option is very powerful

The hook has many options that you can pass in to customize its behaviour, and
the option is a very powerful one that you to do many cool things (pun
intended). Here is a short list of things that we were able to accomplish thanks
to this option:

  * Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
  * Turn queries on and off We have one query that polls data regularly thanks to , but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
  * Wait for user input Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
  * Disable a query after some user input e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager

If you tamper with the queryCache (), it should only be for optimistic updates
or for writing data that you receive from the backend after a mutation. Remember
that every background refetch might override that data, so for local state.

Even if it's only for wrapping one call, creating a custom hook usually pays off
because:

  * You can keep the actual data fetching out of the ui, but co-located with your call.
  * You can keep all usages of one query key (and potentially type definitions) in one file.
  * If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the .

I hope that these practical tips will help you to get started with React Query,
so go check it out :) If you have any further questions, please let me know in
the comments below. ⬇️

Like the monospace font in the code blocks?

---

