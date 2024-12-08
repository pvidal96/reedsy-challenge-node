# Node.js Fullstack Engineer Challenge

## 1. About you

Since I wasn't involved in a project with both, I'll tell you about two different projects:

- In Addmin (a Swiss startup) I worked with Node (and React) to develop a modern document automation platform (mobile app and web app). This app should either handle fiduciary tasks for companies like batch OCR recognition and classification of documents, or everyday tasks for users to securely store their taxes, contracts, etc. and get reminders about due dates or perform automations.
  As one of the original developers, I was involved in developing most of the features of the application. The backend consisted of an API to serve the frontend, another API designed for clients (companies) and several microservices like authentication, OCR, document export and PDF tools.
- At Inbenta (my last company), I was part of the chatbot team and we were responsible for maintaining and developing this product that can be implemented by companies (i.e. a bank that wants a chatbot to help users with simple procedures or just provide help).
  We mainly used PHP + Vue 2. Since it is a large company with many different products, we shared (and maintained) several common Vue.js component libraries to have the same styling and look in each product. The products offered to the client were highly customizable, so any change had to be handled carefully to fit each client's needs and current implementation. The CMS had a lot of functionality, but it's looks were a bit outdated, so we did several major updates involving the main looks like the dashboards to display information in a nicer, friendlier way.

## 2. Document versioning

Since we're trying to build a disk space efficient version control system for texts (or HTML/XML documents), I'll follow a similar approach as when implementing a code VCS. I'll assume that since this exercise is about storing and retrieving data, functions for calculating the differences between two texts or adding differences to a text (cumulatively) already exist.

The idea will be to store the initial version of the document and the changes made to it, so that by calculating the cumulative changes, the current (or any) version of the document can be obtained.

- On the one hand, we want to store the first uploaded version of the document.
- Then we will have a storage for the different updates (changes) made to each document. It should store each change made, the type of change (add, remove, update), the date, and the user who made the change (in case many users can do this).
- Finally, we could have a snapshot storage where we can have a "cached" version of the current document (initial + all changes made) to improve performance by avoiding calculating the current document each time.
  With this simple system, we can easily get the current document and get the novel at any point in it's history by getting the initial document and adding the changes made up to a certain date.

To show the changes between two versions, we just have to calculate the document from the first version and then show the changes made up to the second version. Since this exercise prioritizes disk efficiency, this approach will be less performant than, for example, temporarily caching a snapshot (perhaps for a few hours/minutes) of both versions in case the user wants to compare one of them again later.

This approach should also work for storing and keeping track of the user's changes made during the day (but not committed/saved), in case the user refreshes the page, or there's a network outage or some other failure.

The main trade-off is the performance hit caused by having to compute the changes each time, or having to compute all the cumulative changes when loading a version of a document, but this can be mitigated with the aforementioned "snapshot" system or some sort of caching to avoid doing so many computations.
